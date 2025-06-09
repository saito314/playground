#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
感情分析モジュール
音声特徴量から感情状態を推定します。
"""

import numpy as np
from sklearn.preprocessing import StandardScaler

class EmotionAnalyzer:
    """音声感情分析クラス"""
    
    def __init__(self):
        """初期化"""
        # 感情カテゴリ
        self.emotions = ['喜び', '悲しみ', '怒り', '恐怖', '中立']
        
        # 特徴量のスケーラー
        self.scaler = StandardScaler()
        
        # 簡易的な感情分析のための特徴量閾値（実際には機械学習モデルを使用するべき）
        # ここでは、各感情に対する特徴量の閾値を定義します
        self.thresholds = {
            # 喜び: 高いエネルギー、高いテンポ、高い周波数成分
            '喜び': {
                'energy_threshold': 0.6,
                'tempo_threshold': 100,
                'spectral_centroid_threshold': 2000
            },
            # 悲しみ: 低いエネルギー、低いテンポ、低い周波数成分
            '悲しみ': {
                'energy_threshold': 0.3,
                'tempo_threshold': 80,
                'spectral_centroid_threshold': 1000
            },
            # 怒り: 高いエネルギー、高いゼロ交差率、高いスペクトル帯域幅
            '怒り': {
                'energy_threshold': 0.7,
                'zcr_threshold': 0.1,
                'spectral_bandwidth_threshold': 2000
            },
            # 恐怖: 変動するエネルギー、低い周波数成分、高いスペクトル帯域幅
            '恐怖': {
                'energy_std_threshold': 0.2,
                'spectral_centroid_threshold': 1200,
                'spectral_bandwidth_threshold': 1800
            }
            # 中立: 他の感情に当てはまらない場合
        }
    
    def analyze(self, features):
        """特徴量から感情を分析します"""
        # 結果を格納する辞書
        emotion_scores = {emotion: 0.0 for emotion in self.emotions}
        
        # 特徴量の統計値を取得
        mean_energy = features['mean_energy']
        std_energy = features['std_energy']
        mean_zcr = np.mean(features['zero_crossing_rate'])
        mean_spectral_centroid = np.mean(features['spectral_centroid'])
        mean_spectral_bandwidth = np.mean(features['spectral_bandwidth'])
        tempo = features['tempo']
        
        # 喜び
        joy_score = self._calculate_joy_score(mean_energy, tempo, mean_spectral_centroid)
        emotion_scores['喜び'] = joy_score
        
        # 悲しみ
        sadness_score = self._calculate_sadness_score(mean_energy, tempo, mean_spectral_centroid)
        emotion_scores['悲しみ'] = sadness_score
        
        # 怒り
        anger_score = self._calculate_anger_score(mean_energy, mean_zcr, mean_spectral_bandwidth)
        emotion_scores['怒り'] = anger_score
        
        # 恐怖
        fear_score = self._calculate_fear_score(std_energy, mean_spectral_centroid, mean_spectral_bandwidth)
        emotion_scores['恐怖'] = fear_score
        
        # 中立（他の感情スコアが低い場合）
        neutral_score = self._calculate_neutral_score(emotion_scores)
        emotion_scores['中立'] = neutral_score
        
        # スコアの正規化
        total_score = sum(emotion_scores.values())
        if total_score > 0:
            for emotion in emotion_scores:
                emotion_scores[emotion] /= total_score
        
        return emotion_scores
    
    def _calculate_joy_score(self, energy, tempo, spectral_centroid):
        """喜びの感情スコアを計算"""
        thresholds = self.thresholds['喜び']
        
        energy_score = min(1.0, energy / thresholds['energy_threshold'])
        tempo_score = min(1.0, tempo / thresholds['tempo_threshold']) if tempo > 0 else 0.0
        spectral_score = min(1.0, spectral_centroid / thresholds['spectral_centroid_threshold'])
        
        # 重み付け平均
        return 0.4 * energy_score + 0.3 * tempo_score + 0.3 * spectral_score
    
    def _calculate_sadness_score(self, energy, tempo, spectral_centroid):
        """悲しみの感情スコアを計算"""
        thresholds = self.thresholds['悲しみ']
        
        # 低いエネルギーほど悲しみスコアが高い
        energy_score = 1.0 - min(1.0, energy / thresholds['energy_threshold'])
        
        # 低いテンポほど悲しみスコアが高い
        tempo_score = 1.0 - min(1.0, tempo / thresholds['tempo_threshold']) if tempo > 0 else 1.0
        
        # 低い周波数成分ほど悲しみスコアが高い
        spectral_score = 1.0 - min(1.0, spectral_centroid / thresholds['spectral_centroid_threshold'])
        
        # 重み付け平均
        return 0.4 * energy_score + 0.3 * tempo_score + 0.3 * spectral_score
    
    def _calculate_anger_score(self, energy, zcr, spectral_bandwidth):
        """怒りの感情スコアを計算"""
        thresholds = self.thresholds['怒り']
        
        energy_score = min(1.0, energy / thresholds['energy_threshold'])
        zcr_score = min(1.0, zcr / thresholds['zcr_threshold'])
        bandwidth_score = min(1.0, spectral_bandwidth / thresholds['spectral_bandwidth_threshold'])
        
        # 重み付け平均
        return 0.5 * energy_score + 0.25 * zcr_score + 0.25 * bandwidth_score
    
    def _calculate_fear_score(self, energy_std, spectral_centroid, spectral_bandwidth):
        """恐怖の感情スコアを計算"""
        thresholds = self.thresholds['恐怖']
        
        energy_std_score = min(1.0, energy_std / thresholds['energy_std_threshold'])
        
        # 特定の周波数帯域が恐怖に関連
        centroid_score = 1.0 - abs(spectral_centroid - thresholds['spectral_centroid_threshold']) / thresholds['spectral_centroid_threshold']
        centroid_score = max(0.0, centroid_score)
        
        bandwidth_score = min(1.0, spectral_bandwidth / thresholds['spectral_bandwidth_threshold'])
        
        # 重み付け平均
        return 0.4 * energy_std_score + 0.3 * centroid_score + 0.3 * bandwidth_score
    
    def _calculate_neutral_score(self, emotion_scores):
        """中立の感情スコアを計算（他の感情スコアが低い場合に高くなる）"""
        other_max_score = max([emotion_scores[e] for e in emotion_scores if e != '中立'])
        
        # 他の感情スコアが低いほど中立スコアが高い
        return max(0.0, 1.0 - 2.0 * other_max_score)
    
    def get_dominant_emotion(self, emotion_scores):
        """最も支配的な感情を取得"""
        return max(emotion_scores.items(), key=lambda x: x[1])
