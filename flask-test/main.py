from flask import abort, flash, Flask, redirect, render_template, request, url_for
from db import Post
from werkzeug import secure_filename
import functions as helpers, datetime, os

app = Flask(__name__)
app.secret_key = 'this is my secret key.  i have shoes that are not good for dancing'
app.jinja_env.globals.update(helpers = helpers) #register the helper functions.

UPLOAD_FOLDER = '/Users/gaberankin/Sites/random-crap/flask-test/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'asf'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", defaults={'page': 1})
@app.route("/<int:page>")
def index(page):
	posts = Post.select().paginate(page, 25)
	return render_template('index.html', posts = posts)

@app.route("/post/<int:post_id>")
def show_post(post_id):
	return "Post {post_id}".format(post_id = post_id)

@app.route("/post/create", methods=['GET','POST'])
def create_post():
	p = Post()
	error = None
	if request.method == 'POST':
		if 'body' not in request.form or request.form['body'] == '':
			error = "Post text field cannot be empty"
		else:
			p.body = request.form['body']
			p.date_created = datetime.datetime.utcnow()
			p.date_modified = datetime.datetime.utcnow()
			p.publish_date = datetime.datetime.utcnow()
			p.save()
			flash("Post successfully created", "success")
			return redirect(url_for('update_post', post_id = p.id))
	return render_template('post/create.html', error = error, post = p)

@app.route("/post/update/<int:post_id>", methods=['GET','POST'])
def update_post(post_id):
	try:
		p = Post.get(Post.id == post_id)
	except:
		abort(404)
	error = None
	if request.method == 'POST':
		if 'body' not in request.form or request.form['body'] == '':
			error = "Post text field cannot be empty"
		else:
			p.body = request.form['body']
			p.date_modified = datetime.datetime.utcnow()
			p.save()
			flash("Post successfully updated", "success")
			return redirect(url_for('update_post', post_id = p.id))
	return render_template('post/update.html', error = error, post = p)

def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/uploadtest', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			return redirect(url_for('uploaded_file', filename=filename))
	return '''
	<!doctype html>
	<title>Upload new File</title>
	<h1>Upload new File</h1>
	<form action="" method=post enctype=multipart/form-data>
	  <p><input type=file name=file>
		 <input type=submit value=Upload></p>
	</form>
	'''

@app.errorhandler(404)
def page_not_found(error):
	return render_template('errors/404.html'), 404

if __name__ == "__main__":
	app.run(debug = True)
