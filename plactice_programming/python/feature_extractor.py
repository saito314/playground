#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
特徴抽出モジュール
音声データから様々な特徴量を抽出します。
"""

import numpy as np
import librosa

class FeatureExtractor:
    """音声特徴抽出クラス"""
    
    def __init__(self, n_mfcc=13, n_fft=2048, hop_length=512):
        """初期化"""
        self.n_mfcc = n_mfcc  # MFCCの次元数
        self.n_fft = n_fft  # FFTのウィンドウサイズ
        self.hop_length = hop_length  # FFTのホップ長
    
    def extract_features(self, y, sr):
        """音声データから特徴量を抽出します"""
        features = {}
        
        # MFCC (Mel-Frequency Cepstral Coefficients)
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=self.n_mfcc, 
                                   n_fft=self.n_fft, hop_length=self.hop_length)
        features['mfcc'] = mfcc
        
        # スペクトログラム
        stft = np.abs(librosa.stft(y, n_fft=self.n_fft, hop_length=self.hop_length))
        features['spectrogram'] = stft
        
        # クロマグラム
        chroma = librosa.feature.chroma_stft(y=y, sr=sr, n_fft=self.n_fft, 
                                            hop_length=self.hop_length)
        features['chroma'] = chroma
        
        # ゼロ交差率
        zcr = librosa.feature.zero_crossing_rate(y, frame_length=self.n_fft, 
                                               hop_length=self.hop_length)
        features['zero_crossing_rate'] = zcr[0]  # 1次元配列に変換
        
        # スペクトル重心
        spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr, 
                                                            n_fft=self.n_fft, 
                                                            hop_length=self.hop_length)
        features['spectral_centroid'] = spectral_centroid[0]  # 1次元配列に変換
        
        # スペクトル帯域幅
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr, 
                                                              n_fft=self.n_fft, 
                                                              hop_length=self.hop_length)
        features['spectral_bandwidth'] = spectral_bandwidth[0]  # 1次元配列に変換
        
        # スペクトルロールオフ
        spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr, 
                                                          n_fft=self.n_fft, 
                                                          hop_length=self.hop_length)
        features['spectral_rolloff'] = spectral_rolloff[0]  # 1次元配列に変換
        
        # RMS（Root Mean Square）エネルギー
        rms = librosa.feature.rms(y=y, frame_length=self.n_fft, hop_length=self.hop_length)
        features['rms_energy'] = rms[0]  # 1次元配列に変換
        
        # テンポ推定（音楽の場合）
        if len(y) / sr > 3:  # 3秒以上の音声の場合のみテンポ推定を行う
            try:
                tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
                features['tempo'] = tempo
            except:
                features['tempo'] = 0
        else:
            features['tempo'] = 0
        
        # 統計量の計算
        features['mean_energy'] = np.mean(np.abs(y))
        features['std_energy'] = np.std(np.abs(y))
        features['max_energy'] = np.max(np.abs(y))
        
        return features
    
    def extract_feature_vector(self, features):
        """特徴量から特徴ベクトルを生成します（感情分析用）"""
        # 各特徴量の統計値を計算し、1次元ベクトルに結合
        feature_vector = []
        
        # MFCC統計量
        mfcc_mean = np.mean(features['mfcc'], axis=1)
        mfcc_std = np.std(features['mfcc'], axis=1)
        feature_vector.extend(mfcc_mean)
        feature_vector.extend(mfcc_std)
        
        # クロマグラム統計量
        chroma_mean = np.mean(features['chroma'], axis=1)
        feature_vector.extend(chroma_mean)
        
        # その他の特徴量統計量
        for feature_name in ['zero_crossing_rate', 'spectral_centroid', 
                            'spectral_bandwidth', 'spectral_rolloff', 'rms_energy']:
            feature_vector.append(np.mean(features[feature_name]))
            feature_vector.append(np.std(features[feature_name]))
            feature_vector.append(np.max(features[feature_name]))
        
        # テンポ
        feature_vector.append(features['tempo'])
        
        # エネルギー統計量
        feature_vector.append(features['mean_energy'])
        feature_vector.append(features['std_energy'])
        feature_vector.append(features['max_energy'])
        
        return np.array(feature_vector)
