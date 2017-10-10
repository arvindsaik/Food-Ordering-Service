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

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/admin-dashboard')
def admin_dashboard():
    return render_template('admin-items.html')

@app.route('/adminSignIn', methods=['POST','GET'])
def adminSignIn():
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT CmID from CanteenManager where Username='" + _email + "' and Password='" + _password + "'")
    data = cursor.fetchone()
    if data is not None:
        print('\nLogged in successfully')
        return json.dumps({'success':True}), 200, {'message':'Logged in successfully'}
    else:
        print('\nUsername or Password is wrong')
        return json.dumps({'success':False}), 400, {'error':'Username or Password is wrong'}


@app.route('/signIn',methods=['POST','GET'])
def signIn():
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT Password from Student where EmailID='" + _email + "'")
    data = cursor.fetchone()
    # print(data)
    if data is not None and check_password_hash(data[0], _password):
        print('\nLogged in successfully')
        return json.dumps({'success':True}), 200, {'message':'Logged in successfully'}
    else:
        print('\nUsername or Password is wrong')
        return json.dumps({'success':False}), 400, {'error':'Username or Password is wrong'}


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
        conn = mysql.connect()
        cursor = conn.cursor()
        _hashed_password = generate_password_hash(_password)
        cursor.callproc('sign_up',(_firstName,_lastName, _email, _hashed_password, _roomNo, _floor, _hostelName, _phoneNumber))
        data = cursor.fetchall()

        if len(data) is 0:
            conn.commit()
            return json.dumps({'success':True}), 200, {'message':'User created successfully !'}
        else:
            return json.dumps({'success':False}), 400, {'error':str(data[0])}

    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

@app.route('/add-item', methods=['POST', 'GET'])
def add_item():

    _item = request.form['item']
    _price = request.form['price']
    _imageUrl = request.form['imgName']
    _preparationTime = request.form['prepTime']
    _availability = request.form['availability']

    if _item and _price and _imageUrl and _preparationTime and _availability:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.callproc('add_item', (_item, _price, _availability, _imageUrl, _preparationTime))
        data = cursor.fetchone()
        if data is None:
            conn.commit()
            return json.dumps({'success':True}), 200, {'message':'Item added successfully !'}
        else:
            return json.dumps({'success':False}), 400, {'error':str(data[0])}
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})


@app.route('/delete-item', methods=['POST', 'GET'])
def delete_item():
    _itemId = request.form['id'];
    if _itemId:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.callproc('delete_item', (_itemId))
        data = cursor.fetchone()

        if data is None:
            conn.commit()
            return json.dumps({'success':True}), 200, {'message':'Item deleted successfully !'}
        else:
            return json.dumps({'success':False}), 400, {'error':str(data[0])}
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})


@app.route('/display-item', methods=['POST', 'GET'])
def display_item():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM FoodItem")
    data = cursor.fetchall()
    return json.dumps(data)

def create_database():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("""SELECT COUNT(DISTINCT `table_name`) FROM `information_schema`.`columns` WHERE `table_schema` = 'Project'""")
    data = cursor.fetchone()
    if data[0] == 0:
        cursor.execute("""create table Student(
                        SID int not null primary key auto_increment,
                        FirstName varchar(20) not null,
                        LastName varchar(20) not null,
                        PhoneNumber bigint unique,
                        EmailID varchar(20) not null unique,
                        RoomNo varchar(10) not null,
                        Floor varchar(10) not null,
                        BlockName varchar(30) not null,
			            Password longtext not null);
                        """)
        cursor.execute("""
                        CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(IN p_fname varchar(20), IN p_lname varchar(20), IN p_email varchar(20), IN p_password longtext, IN p_roomNo varchar(10), IN p_floor varchar(10), IN p_blockName varchar(30), IN p_phoneNumber bigint)
                        begin
                        if ( select exists (select 1 from Student where EmailID = p_email) ) THEN
                        select "Email aldready registered!";
                        else
                        insert into Student(FirstName, LastName, EmailID, Password, RoomNo, Floor, BlockName, PhoneNumber) values(p_fname, p_lname, p_email, p_password, p_roomNo, p_floor, p_blockName, p_phoneNumber);
                        end if;
                        end
                        """)

        cursor.execute("""create table NightCanteen(
                        NcID int not null primary key auto_increment,
                        Name varchar(40) not null,
                        Location varchar(100) not null,
                        StartTime time not null,
                        EndTime time not null);
                        """)

        cursor.execute("""create table NPhone(
                        NcID int not null,
                        PhoneNumber bigint not null,
                        primary key(NcID, PhoneNumber),
                        foreign key(NcID) references NightCanteen(NcID));
                        """)

        cursor.execute("""create table CanteenManager(
                        CmID int not null primary key auto_increment,
                        Name varchar(40) not null,
                        NcID int not null,
                        Username varchar(30) not null,
                        Password varchar(100) not null);
                        """)
        cursor.execute("INSERT INTO CanteenManager(Name, NcID, Username, Password) VALUES('Manager', 2, 'manager@gmail.com', 'password');")

        cursor.execute("""create table FoodItem
                        (FoodID int not null primary key auto_increment,
                        Name varchar(20) not null, Price int not null,
                        Availability int not null,
                        ImageURL varchar(100),
                        Ratings int,
                        PreparationTime int not null,
                        CmID int,
                        foreign key(CmID) references CanteenManager(CmID));
                        """)

        cursor.execute("""
                        CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_item`(IN p_foodId int)
                        begin
                        if ( select not exists(select 1 from FoodItem where FoodID = p_foodId) )
                        THEN select "Food Item doesn't exist!";
                        else
                        delete from FoodItem where FoodID = p_foodId;
                        end if;
                        end
                        """)
        cursor.execute("""
                        CREATE DEFINER=`root`@`localhost` PROCEDURE `add_item`( IN p_name varchar(20), IN p_price int, IN p_availability int, IN p_imageUrl varchar(100), IN p_preparationTime int)
                        begin
                        insert into FoodItem(Name, Price, Availability, ImageURL, PreparationTime) values(p_name, p_price, p_availability, p_imageUrl, p_preparationTime);
                        end
                        """)

        cursor.execute("""create table Items(
                        OrderID int not null,
                        FoodID int not null,
                        Quantity int not null,
                        primary key(OrderID,FoodID,Quantity));
                        """)

        cursor.execute("""create table StudentOrder(
                        SID int not null,
                        OrderID int not null,
                        primary key(SID,OrderID));
                        """)

        cursor.execute("""create table Orders
                        (OrderID int not null primary key auto_increment,
                        ODate date not null,
                        Total int not null,
                        UserID int not null,
                        Status varchar(30),
                        CmID int,
                        foreign key(CmID) references CanteenManager(CmID) );
                        """)

        cursor.execute("""create table DeliveryBoy(
                        OrderID int not null,
                        Name varchar(30) not null,
                        RegNo varchar(30) not null,
                        NcID int not null,
                        SID int not null,
                        primary key(OrderID,Name),
                        foreign key(NcID) references NightCanteen(NcID),
                        foreign key(SID) references student(SID)
                        );
                        """)

if __name__ == "__main__":
    create_database()
    app.run(port=5000)
