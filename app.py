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


def create_database():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("""SELECT COUNT(DISTINCT `table_name`) FROM `information_schema`.`columns` WHERE `table_schema` = 'Project'""")
    data = cursor.fetchone()
    if data[0] == 0:
        cursor.execute("""create table Student(
                        SID int not null primary key,
                        FirstName varchar(20) not null,
                        LastName varchar(20) not null,
                        PhoneNumber bigint unique,
                        EmailID varchar(20) not null unique,
                        RoomNo varchar(10) not null,
                        Floor varchar(10) not null,
                        BlockName varchar(30) not null);
                        """)
        cursor.execute("""
                        CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(IN p_fname varchar(20), IN p_lname varchar(20), IN p_email varchar(20), IN p_password varchar(100), IN p_roomNo varchar(10), IN p_floor varchar(10), IN p_blockName varchar(30), IN p_phoneNumber bigint)
                        begin
                        if ( select exists (select 1 from student where EmailID = p_email) ) THEN
                        select "Email aldready registered!";
                        else
                        insert into student(FirstName, LastName, EmailID, Password, RoomNo, Floor, BlockName, PhoneNumber) values(p_fname, p_lname, p_email, p_password, p_roomNo, p_floor, p_blockName, p_phoneNumber);
                        end if;
                        end
                        """)

if __name__ == "__main__":
    create_database()
    app.run(port=5000)
