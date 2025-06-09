#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
音声ファイル分析スクリプト
WAVファイルを読み込み、音声特徴を抽出し、感情分析を行い、結果を標準出力します。
"""

import os
import sys
import time
import argparse
import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from feature_extractor import FeatureExtractor
from emotion_analyzer import EmotionAnalyzer

def parse_arguments():
    """コマンドライン引数を解析します"""
    parser = argparse.ArgumentParser(description='音声ファイル分析ツール')
    parser.add_argument('audio_file', type=str, help='分析するWAVファイルのパス')
    parser.add_argument('--visualize', action='store_true', help='特徴量を可視化する（オプション）')
    return parser.parse_args()

def load_audio_file(file_path):
    """WAVファイルを読み込みます"""
    try:
        # librosaを使用して音声ファイルを読み込む
        y, sr = librosa.load(file_path, sr=None)
        duration = librosa.get_duration(y=y, sr=sr)
        return y, sr, duration
    except Exception as e:
        print(f"エラー: 音声ファイルの読み込みに失敗しました: {e}")
        sys.exit(1)

def display_audio_info(file_path, duration, sr):
    """音声ファイルの基本情報を表示します"""
    print("===== 音声ファイル分析結果 =====")
    print(f"ファイル名: {os.path.basename(file_path)}")
    print(f"長さ: {duration:.2f}秒")
    print(f"サンプリングレート: {sr}Hz")
    print()

def visualize_features(y, sr, features):
    """特徴量を可視化します（オプション）"""
    plt.figure(figsize=(12, 8))
    
    # 波形
    plt.subplot(3, 1, 1)
    librosa.display.waveshow(y, sr=sr)
    plt.title('波形')
    
    # スペクトログラム
    plt.subplot(3, 1, 2)
    D = librosa.amplitude_to_db(np.abs(librosa.stft(y)), ref=np.max)
    librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log')
    plt.colorbar(format='%+2.0f dB')
    plt.title('スペクトログラム')
    
    # MFCC
    plt.subplot(3, 1, 3)
    librosa.display.specshow(features['mfcc'], x_axis='time')
    plt.colorbar()
    plt.title('MFCC')
    
    plt.tight_layout()
    plt.show()

def main():
    """メイン関数"""
    # コマンドライン引数の解析
    args = parse_arguments()
    
    # 処理開始時間
    start_time = time.time()
    
    # 音声ファイルの読み込み
    y, sr, duration = load_audio_file(args.audio_file)
    
    # 音声ファイルの基本情報を表示
    display_audio_info(args.audio_file, duration, sr)
    
    # 特徴抽出
    feature_extractor = FeatureExtractor()
    features = feature_extractor.extract_features(y, sr)
    
    # 特徴量の表示
    print("----- 音声特徴 -----")
    for feature_name, feature_value in features.items():
        if isinstance(feature_value, np.ndarray):
            if feature_value.ndim > 1:
                # 2次元以上の特徴量は平均値を表示
                print(f"{feature_name}平均値: {np.mean(feature_value, axis=1)[:5]}...")
            else:
                # 1次元の特徴量は先頭5つの値を表示
                print(f"{feature_name}: {feature_value[:5]}...")
        else:
            # スカラー値はそのまま表示
            print(f"{feature_name}: {feature_value}")
    print()
    
    # 感情分析
    emotion_analyzer = EmotionAnalyzer()
    emotions = emotion_analyzer.analyze(features)
    
    # 感情分析結果の表示
    print("----- 感情分析 -----")
    for emotion, confidence in emotions.items():
        print(f"{emotion}: {confidence*100:.2f}%")
    print()
    
    # 処理時間の表示
    end_time = time.time()
    print(f"処理時間: {end_time - start_time:.2f}秒")
    
    # 特徴量の可視化（オプション）
    if args.visualize:
        visualize_features(y, sr, features)

if __name__ == "__main__":
    main()
