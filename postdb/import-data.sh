#run the setup script to create the DB and the schema in the DB
#do this in a loop because the timing for when the SQL instance is ready is indeterminate
for i in {1..50};
do
    psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='product'"
    if [ $? -eq 0 ]
    then
        if [ "$( psql -h 0.0.0.0 -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='DB_NAME'" )" = '1' ]
        then
            echo "Database already exists"
            break
        else
            psql -h 0.0.0.0 -U postgres -f ./create-db.sql
            echo "Database created"
            break
        fi
    else
        echo "not ready yet..."
        sleep 1
    fi
done
