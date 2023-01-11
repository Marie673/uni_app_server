[![Deploy to Amazon EC2](https://github.com/Marie673/uni_app_server/actions/workflows/aws.yml/badge.svg?branch=develop&event=deployment_status)](https://github.com/Marie673/uni_app_server/actions/workflows/aws.yml)
# ブランチの管理
## master
本番サーバ用
ここに変更があると本番サーバが更新されます。

## develop
開発用
基本的にここにプルリクしていってください。今後、テスト用サーバを用意します。


# コミットメッセージの書き方
今後のことも考えて日本語で書きます。

## フォーマット
```
【コミット種類】要約
// 1行空白
変更した理由を具体的に
```

## コミット種類
* fix：バグ修正
* hotfix：クリティカルなバグ修正
* add：新規（ファイル）機能追加
* update：機能修正（バグではない）
* change：仕様変更
* clean：整理（リファクタリング等）
* disable：無効化（コメントアウト等）
* remove：削除（ファイル）
* upgrade：バージョンアップ
* revert：変更取り消し

# src
## domain
ドメインレイヤー

知識をコードとして貯めていきます。
### entity
エンティティの情報はここに集約します。
### repository
エンティティ情報などの永続化を行います。

使用する技術の変更に耐えるために、基本的にinfrastructureのdbを呼び出します。

## infrastructure
外部モジュールとの接続
### db
データベースの操作を行います。

### authentication
認証について外部との接続を行います。

### filebase
スマホアプリへの通知機能を行います。

## routes
いわゆるアプリケーションレイヤー
### admin
Web管理画面用

### api
スマホアプリからのリクエストを処理します。

### test
開発用

## test
テストファイル
