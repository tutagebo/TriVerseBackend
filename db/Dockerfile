FROM mysql:8.4
ENV TZ=Asia/Tokyo

# MySQL設定ファイル
COPY ./mysql.cnf /etc/mysql/conf.d/mysqld.cnf
# 初期化用SQL
COPY ./init /docker-entrypoint-initdb.d/
