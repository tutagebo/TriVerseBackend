erDiagram
    USER  ||--o{ MUSIC      : posts
    USER  ||--o{ CHART      : creates
    MUSIC ||--o{ CHART      : has
    USER  ||--o{ HIGH_SCORE : plays
    CHART ||--o{ HIGH_SCORE : has_scores

    USER {
        BINARY(16) id PK
        VARCHAR(32) name
        VARBINARY(255) password_hash
        TIMESTAMP created_at
    }

    MUSIC {
        BINARY(16) id PK
        BINARY(16) post_user_id FK
        VARCHAR(64) title
        VARCHAR(64) artist
        TIMESTAMP created_at
    }

    CHART {
        BINARY(16) id PK
        BINARY(16) music_id FK
        BINARY(16) creator_user_id FK
        UNSIGNEDTINYINT difficulty
        TIMESTAMP created_at
    }

    HIGH_SCORE {
        BINARY(16) user_id  FK
        BINARY(16) chart_id FK
        INT score
        BOOLEAN full_combo
        TIMESTAMP played_at
    }
