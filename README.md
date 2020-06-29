# Build ECommerce Website - Beginner Web Developer Course

Build Full ECommerce By Node and JavaScript In 5 Hours

Welcome to my coding course to build an ecommerce website like amazon.com.
In this course you will learn the essential tools and skills to build a fully-functional ecommerce website using Node and JavaScript without any framework.

# Instructor

Hello, I am Basir Jafarzadeh and I'll be your instructor in this course.

# Web Development Crash Course

1. Introduction
   1. Introduction to this course
      1. What you will learn
      2. Who is instructor
      3. What you will build
      4. What tools you will use
   2. Install Tools
      1. VS Code
      2. Google Chrome
      3. ...
2. Beginner Web Development
   1. Create web page by HTML5
      1. html document structure, tags, elements, attributes
      2. heading, paragraph and list
      3. image, table and forms
      4. semantic elements
   2. Style web page by CSS3
      1. setup css (inline, internal and external)
      2. selectors (tag, id, class, )
      3. Specificity (id, class, tag)
      4. nested selectors
      5. typography
      6. positioning
      7. CSS Grid
      8. Flexbox
   3. Make interactive web page by JavaScript ES6+
      1. how to write javascript program
      2. data types and variables
      3. operators and conditions
      4. functions
      5. arrays and loops
      6. objects and classes
      7. template literals
      8. working with DOM

## Build ECommerce Website

1. Create Folder Structure
   1. create root folder as jsamazona
   2. add frontend and backend folder
   3. create src folder in frontend
   4. create index.html with heading jsamazona in src
   5. run npm init in frontend folder
   6. npm install live-server
   7. add start command as live-server src --verbose
   8. run npm start
2. Design Website
   1. create style.css
   2. link style.css to index.html
   3. create div.grid-container
   4. create header, main and footer
   5. style html, body
   6. style grid-container, header, main and footer
3. Create Static Home Screen
   1. create ul.products
   2. create li
   3. create div.product
   4. add .product-image, .product-name, .product-brand, .product-price
   5. style ul.products and internal divs
   6. duplicate 2 times to show 3 products
4. Render Dynamic Home Screen
   1. create data.js
   2. export an array of 3 products
   3. create screen/HomeScreen.js
   4. export HomeScreen as an object with render() method
   5. implement render()
   6. import data.js
   7. return products mapped to lis inside an ul
   8. create app.js
   9. link it to index.html as module
   10. set main id to main_container
   11. create router() function
   12. set main_container innerHTML to HomeScreen.render()
   13. set load event of window to router() function
5. Build Url Router
   1. create routes as route:screen object
   2. create utils.js
   3. export parseRequestURL()
   4. set url as hash address split by slash
   5. return resource, id and verb of url
   6. update router()
   7. set request as parseRequestURL()
   8. build parsedUrl and compare with routes
   9. if route exists render it, else render Error404
   10. create screens/Error404.js and render error message
6. Create Node.JS server
   1. run npm init in root jsamazona folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. move data.js from frontend to backend
   7. create route for /api/products
   8. return products in data.js
   9. run npm start
7. Load Products From Backend
   1. edit HomeScreen.js
   2. make render async
   3. fetch products from '/api/products' in render()
   4. make router() async and call await HomeScreen.render()
8. Add Webpack
   1. npm install -D webpack webpack-cli webpack-dev-server
   2. npm uninstall live-server
   3. "start": "webpack-dev-server --mode development --watch-content-base --open"
   4. "build": "webpack --mode=production --output ./main.js"
   5. move index.html, style.css and images to frontend folder
   6. rename app.js to index.js
   7. update index.html
   8. add <script src="main.js"></script> before </body>
   9. npm install axios
   10. change fetch to axios in HomeScreen
9. Install Babel For ES6 Syntax
   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start
10. Enable Code Linting
11. npm install -D eslint
12. install VSCode eslint extension
13. create .eslintrc and set module.exports for env to node
14. Set VSCode setting for editor.codeActionsOnSave source.fixAll.eslint to true
15. check result for linting error
16. npm install eslint-config-airbnb-base and eslint-plugin-import
17. set extends to airbnb-base
18. set parserOptions to ecmaVersion 11 and sourceType to module
19. set rules for no-console to 0 to ignore linting error
20. Install VSCode Extension
    1. JavaScript (ES6) code snippets
    2. ES7 React/Redux/GraphQL/React-Native snippets
    3. Prettier - Code formatter
    4. HTML&LESS grammar injections
    5. CSS Peek
21. Create Rating Component
    1. create components/Rating.js
    2. create div.rating
    3. link to fontawesome.css in index.html
    4. define Rating object with render()
    5. if !props.value return empty div
    6. else use fa fa-star, fa-star-half-o and fa-star-o
    7. last span for props.text || ''
    8. style div.rating, span and last span
    9. Add div.product-rating and use Rating component
22. Product Screen
    1. get product id from request
    2. implement /api/product/:id api
    3. send Ajax request to product api
    4. create back to result link
    5. create div.details with 3 columns
    6. column 1 for product image
    7. column 2 for product information
    8. column 3 form product action
    9. style .details and all columns
    10. create add to cart button with add-button id
    11. after_render() to add event to the button
    12. redirect user to cart/:product_id
    13.
23. Shopping Cart Screen
    1. step 1
24. Update Shopping Cart
    1. step 1
25. Create Url Router
    1. step 1
26. Create Url Router
    1. step 1
27. Create Url Router
    1. step 1
28. Create Url Router
    1. step 1
29. Create Url Router
    1. step 1
30. Create Url Router
    1. step 1
31. Create Url Router
    1. step 1
32. Create Url Router
    1. step 1
33. Create Url Router
    1. step 1
34. Create Url Router
    1. step 1
35. Create Url Router
    1. step 1
36. Create Url Router
    1. step 1
37. Create Url Router
    1. step 1
38. Create Url Router
    1. step 1
39. Create Url Router
    1. step 1
40. Create Url Router
    1. step 1
41. Create Url Router
    1. step 1
42. Create Url Router
    1. step 1
43. Create Url Router
    1. step 1
44. Create Url Router
    1. step 1
45. Create Url Router
    1. step 1
46. Create Url Router
    1. step 1
47. Create Url Router
    1. step 1
48. Create Url Router
    1. step 1
49. Create Url Router
    1. step 1
50. Create Url Router
    1. step 1
51. Create Url Router
    1. step 1
52. Create Url Router
    1. step 1
53. Create Url Router
    1. step 1
54. Create Url Router
    1. step 1
55. Create Url Router
    1. step 1
56. Create Url Router
    1. step 1
57. Create Url Router
    1. step 1
58. Create Url Router
    1. step 1
59. Create Url Router
    1. step 1
60. Create Url Router
    1. step 1
61. Create Url Router
    1. step 1
62. Create Url Router
    1. step 1
63. Create Url Router
    1. step 1
64. Create Url Router
    1. step 1
65. Create Url Router
    1. step 1

## Video 01: Design Website Template

Use CSS Grid to design a basic template for amazona including header, main and footer.

1.  create jsamazona folder
2.  add frontend folder
3.  add new file index.html
4.  link style.css
5.  create div.grid-container
6.  create header, main and footer
7.  style grid-container, header, main and footer

## Video 02: Create Static Products Thumbnail

Use Flexbox to show products horizontally. Also make them responsive by push them down on small screens.

1. create ul.products
2. create li
3. create div.product
4. add .product-image, .product-name, .product-brand, .product-price
5. style ul.products and internal divs
6. duplicate 2 times to show 3 products

## Video 03: Render Products

Create an array of products and render them into screen using template literals.

1. create app.js
2. link it to index.html as module
3. define products array with 3 items
4. define render() function
5. set productsUl to ul.products with lis
6. document.getElementById('products') = productsUl
7. window.addEventListener('load', render)
8. copy products thumbnail elements from previous lesson and paste here

## Video 04: Create Url Router

Steps:

1. step 1

## Video 05: Home Screen

Steps:

1. step 1

## Video 06: Create Node Server

Steps:

1. step 1

## Video 06: Load Products From Backend

Steps:

1. step 1

## Video 07: Product Screen

Steps:

1. step 1

## Video 08: Handle Add To Cart

Steps:

1. step 1

## Video 09: Shopping Cart Screen

Steps:

1. step 1

## Video 10: Update Shopping Cart

Steps:

1. step 1
