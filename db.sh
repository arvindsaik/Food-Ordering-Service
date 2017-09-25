#!/bin/bash
#!/bin/expect
mysql -u root -p
expect "password: "
send "maa,1234"