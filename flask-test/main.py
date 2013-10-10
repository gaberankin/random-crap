from flask import abort, flash, Flask, redirect, render_template, request, url_for
from db import Post
import functions as helpers

app = Flask(__name__)
app.secret_key = 'this is my secret key.  i have shoes that are not good for dancing'
app.jinja_env.globals.update(helpers = helpers)


@app.route("/")
def index():
	return render_template('index.html')

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

@app.errorhandler(404)
def page_not_found(error):
	return render_template('errors/404.html'), 404

if __name__ == "__main__":
	app.run(debug = True)
