for i in {1..50};
do
    /opt/mssql-tools/bin/sqlcmd -U sa -P pkSodmp45ni -Q "IF DB_ID (N'AUTH_DB') IS NULL CREATE DATABASE AUTH_DB"
    if [ $? -eq 0 ]
    then
        /opt/mssql-tools/bin/sqlcmd -U sa -P pkSodmp45ni -d 'AUTH_DB' -i setup.sql
        echo "setup script completed"
        break
    else
        sleep 1
    fi
done
