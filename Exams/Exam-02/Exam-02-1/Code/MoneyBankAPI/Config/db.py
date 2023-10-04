from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://root:admin1234@localhost:3306/moneybankdb")



meta_data = MetaData()