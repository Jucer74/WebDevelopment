from sqlalchemy import create_engine, MetaData, Table

# Configura el motor de la base de datos
database_url = "mysql+pymysql://root:1005540883Ja%@localhost:3306/UsersDB"
engine = create_engine(database_url)

# Configura la metadata
meta = MetaData(bind=engine)

# Carga automáticamente la tabla transactions
transactions = Table("transactions", meta, autoload=True)

# Aqui se crea la conexion
conn = engine.connect()

