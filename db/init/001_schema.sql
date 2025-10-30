-- 文字コードはテーブルごとに指定（DB作成は docker 環境変数の MYSQL_DATABASE に依存）
-- 必要なら: CREATE DATABASE IF NOT EXISTS app CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- PLAYER
CREATE TABLE IF NOT EXISTS `players` (
  `id`            BINARY(16)      NOT NULL,
  `login_id`      VARCHAR(64)     NOT NULL,
  `name`          VARCHAR(32)     NOT NULL,
  `password_hash` VARBINARY(255)  NOT NULL,
  `created_at`    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_player_login_id` (`login_id`),
  UNIQUE KEY `uq_player_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- MUSIC
CREATE TABLE IF NOT EXISTS `musics` (
  `id`            BINARY(16)   NOT NULL,
  `post_player_id`  BINARY(16)   NOT NULL,
  `title`         VARCHAR(64)  NOT NULL,
  `artist`        VARCHAR(64)  NOT NULL,
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_music_post_player` (`post_player_id`),
  CONSTRAINT `fk_music_post_player`
    FOREIGN KEY (`post_player_id`) REFERENCES `players`(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- CHART（難易度は 1〜32 の整数）
CREATE TABLE IF NOT EXISTS `charts` (
  `id`               BINARY(16)        NOT NULL,
  `music_id`         BINARY(16)        NOT NULL,
  `creator_player_id`  BINARY(16)        NOT NULL,
  `difficulty`       TINYINT UNSIGNED  NOT NULL,
  `created_at`       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_chart_music` (`music_id`),
  KEY `ix_chart_creator` (`creator_player_id`),
  CONSTRAINT `chk_chart_difficulty` CHECK (`difficulty` BETWEEN 1 AND 32),
  CONSTRAINT `fk_chart_music`
    FOREIGN KEY (`music_id`) REFERENCES `musics`(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `fk_chart_creator`
    FOREIGN KEY (`creator_player_id`) REFERENCES `players`(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- high_scores（プレイヤー×譜面で疑似1対1：複合主キー）
CREATE TABLE IF NOT EXISTS `high_scores` (
  `player_id`  BINARY(16)  NOT NULL,
  `chart_id`   BINARY(16)  NOT NULL,
  `score`      INT         NOT NULL,
  `full_combo` BOOLEAN     NOT NULL DEFAULT FALSE,
  `played_at`  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`, `chart_id`),
  KEY `ix_hs_chart` (`chart_id`),
  CONSTRAINT `fk_hs_player`
    FOREIGN KEY (`player_id`)  REFERENCES `players`(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_hs_chart`
    FOREIGN KEY (`chart_id`) REFERENCES `charts`(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
