import peewee as pw

db = pw.MySQLDatabase('dumb', host='localhost', user='root', passwd='')

class BaseModel(pw.Model):
	class Meta:
		database = db

class Post(BaseModel):
	id = pw.PrimaryKeyField()
	body = pw.CharField(null=True)
	date_created = pw.DateTimeField(null=True)
	date_modified = pw.DateTimeField(null=True)
	publish_date = pw.DateTimeField(null=True)

	class Meta:
		order_by = ('-publish_date',)

def create_tables():
	Post.create_table()
