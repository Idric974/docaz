NEXT_PUBLIC_ANALYTICS_URL=http://localhost:5000/
#NEXT_PUBLIC_ANALYTICS_URL=https://murmuring-beach-02874.herokuapp.com/

${process.env.NEXT_PUBLIC_ANALYTICS_URL}
test
Ok pour les test Ok

"scripts": {
"dev": "nodemon server.js",
"build": "next build",
"start": "NODE_ENV=production node server.js"
},

"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
},
