# Night Canteen Order Management System

Presently students in hostels of NITK have to call the various night canteens that are present and place their order. Problems faced with the present system are manifold, firstly the cell phone balance that gets wasted on the call, secondly lack of a proper menu for students to look at or hard to access menus, thirdly no status available on your order. With our system in place all the above problems will be eradicated and placing orders could never be simpler.
The idea of the project is to build a web application that would make the process of ordering food from night canteen seamless. This application would have everything from the ratings of food items available to the status of your orders.

We plan to create a database for all the night canteens in NITK by having a table for each of the Night Canteens which contains the different food items available, their prices, rating, estimated time for delivery, etc. We will provide options for the users to provide reviews and rate the food so that it may be useful to the other users and also to the Night Canteen so that they can improve the quality of their food. Also users can repeat their previous orders as there will be an option for order history.

It will also have a database of the registered users (Students) which will contain details like their names, address, phone number, email id, etc. 


## Technologies used
Flask for the back end of the web application with MySQL database, and Javascript, HTML, CSS for front end of the application. 

## Setup

### Install the following 
1) Python 3
2) Flask
3) Mysql

- Set password for root user in MySql as "password" and create a database called Project.

Run the below command
```
python app.py
```

