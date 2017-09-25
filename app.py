from flask import Flask, render_template, json, request
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash

mysql = MySQL()
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'Project'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/')
def main():
    return render_template('login.html')

@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')


@app.route('/signIn',methods=['POST','GET'])
def signIn():
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * from student where EmailID='" + _email + "' and Password='" + _password + "'")
    data = cursor.fetchone()
    if data is None:
        print('\nUsername or Password is wrong')
        return json.dumps({'message':'Username or Password is wrong'})
    else:
        print('\nLogged in successfully')
        return json.dumps({'message':'Logged in successfully'})

@app.route('/signUp',methods=['POST','GET'])
def signUp():

    _firstName = request.form['inputFirstName']
    _lastName = request.form['inputLastName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    _roomNo = request.form['roomNo']
    _floor = request.form['floor']
    _hostelName = request.form['hostelName']
    _phoneNumber = request.form['Pnumber']



    # validate the received values
    if _firstName and _lastName and _email and _password and _roomNo and _floor and _hostelName and _phoneNumber:

        # All Good, let's call MySQL

        conn = mysql.connect()
        cursor = conn.cursor()
        _hashed_password = generate_password_hash(_password)
        cursor.callproc('sign_up',(_firstName,_lastName, _email,_password, _roomNo, _floor, _hostelName, _phoneNumber))
        data = cursor.fetchall()

        if len(data) is 0:
            conn.commit()
            return json.dumps({'message':'User created successfully !'})
        else:
            return json.dumps({'error':str(data[0])})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

if __name__ == "__main__":
    app.run(port=5000)
