# Author: Chu Van Long
# Finished Date: 10-Apr-2023
# Assignment: Build an application allows to get articles from specified websites: vnexpress.net, dantri.com...

######

# 1. SOLUTION:
# 1.1 How to collect information from website (vnexpress.net)?
# ==> Here, I'm using "puppeteer" package with NodeJs and Express framewrork to build app.
# Another way, we can use "cheerio" package and "axios" to get data from sites. It's very fast and light-weight. But, it has a draw-back with "cheerio" and "axios". If websites is too long (long scrolling down), we cannot get all needed information, maybe DOM elements have not been loaded yet.
# In this case, I chose using "puppeteer". But this package is unstable and slower than others tools, because it's using chromium browser (installed during package installation).
# And it's unstable, exceed time-out happens sometimes.

# 1.2 How to process collected data?
# ==> Ideally, I created a function "crawlData" to get articles and urls base on data collected before by using "puppeteer". Then I composed all of these into an array of object that will be stored in db.
# To optimize, I created another function "crawlData_Worker" by using worker_threads to increase performance. That's my idea.
# Please check in "/lib/processing.js" for more detail.

# 1.3 How to store and display?
# ==> My answer are using MongoDb to store data in documents and using "ejs" engine to display .html format.
# Documents data schema like below:
# "data": [
#    {
#       title : "Article 1",
#       url: http://vnexpress.net/article-1.html/,
#       source: vnexpress
#    },
# I saved a template format display: "./public/Crawling Data.html". You can open in web browser to see more detail.

######

# HOW TO RUN:
# - Using and IDE to open my project (like VSCode)
# - Open terminal and run command: "npm install" to install packages in package.json file
# - Run "npm start"
#
# NOTE:
# 1. Because I'm using MongoDB Atlas as a primary DB. It requires # add IP address to cluster on it's cloud. If you need to test, # please contact and send to me your IP Address by email.
# 2. Puppeteer works unstable, if you get an error message, please restart application few times.