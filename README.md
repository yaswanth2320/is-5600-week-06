# Lab 06 | Fullstack Prints React Part 1

## Overview

In this lab, we are going to take the UI (User Interface) from our previous labs and build it in React. We will be using the same data from the previous labs, and will not be connecting the React app to our Node app quite yet. This lab will focus on building out pagination using the `useState` and `useEffect` hooks, and adding a single page view to the application. You'll make register some existing components, and build out some new components to complete the application. Finally, on your own, you will add the ability to search or filter the products by tags. This lab will be a great opportunity to practice your React skills, and to get comfortable with the React ecosystem.

## Instructions

1. To begin, inspect your `src` directory. This is where the majority of your application code will exist. For this lab we will be building a React application, so the main file types we will work with will be the `*.jsx` files. These files are essentially the same as the `*.js` files we have been working with, but they are used to denote that the file contains JSX code. JSX is a syntax extension to JavaScript that allows us to write HTML-like code in our JavaScript files. This is a very powerful feature of React, and we will be using it extensively in this lab. Take a moment to familiarize yourself with the `App.jsx` and the `index.jsx` files. The `App.jsx` file is the main component of our application, and the `index.jsx` file is the entry point for our application.

2. Next, inspect the `public` directory. This is where our static assets will live. Static assets are files that do not change, such as images, fonts, and stylesheets. In this lab we will be using the `index.html` file as our entry point for our application. This is where we will be linking our `bundle.js` file, which is the compiled version of our React application. We will also be linking our `style.css` file, which contains the styles for our application.

3. Let's begin. First, let's boot up the application. Run your Replit lab and view the application in the browser. You should see a blank page with the text "Hello There!" in the center of the page.

4. Review the `src` directory, you will see a directory called `components`. This is where we will be building our application; this directory holds all of the components that will make up our application. You'll see we have a `Header.jsx` component already defined. Let's include that in our `App.jsx`:

```jsx
// App.jsx
import Header from './components/Header';

import productData from './data/full-products';

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
```

Visit your application in the browser. You should see the header component rendered on the page.

5. Next, let's add the Products to our page. We will create a new component called `CardsList.jsx` in the `components` directory. This component will be responsible for rendering the list of products. You will see that a `Card.jsx` component already exists. This component will be responsible for rendering a single product. So we will want to configure the `CardsList.jsx` component to render a list of `Card.jsx` components and pass the relevant data to each component.

```jsx
// CardsList.jsx

const CardList = () => {
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        <p>Cards go here</p>
      </div>
    </div>
  )
}

export default CardList;
```

Next, let's register the `CardList` component in our `App.jsx` component. We will also need to import the `CardList` component into our `App.jsx` component.

```jsx
// App.jsx

// ...

function App() {
  return (
    <div className="App">
      <Header />
      <CardList />
    </div>
  );
}
```

Be sure to import the `CardList` component into the `App.jsx` component: `import CardList from './components/CardList';`. Visit your application in the browser. You should see the header component rendered on the page, and the text "Cards go here" in the center of the page.

6. That's great, but our card list is missing data. In the `data` directory, we have the same good old `products.json` file that we have been using. You may have noticed we import that data into our `App.jsx` but we are not doing anything with it. Let's pass it to our `CardsList` component as a prop. Update your `CardList` component to accept a `products` prop.

```jsx
// App.jsx
function App() {
  return (
    <div className="App">
      <Header />
      <CardList data={productData} />
    </div>
  );
}
```

Next, update your `CardList` component to accept the `data` prop and use it to render the list of products.

```jsx
const CardList = ({data}) => {
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
      // Using the data prop, we map over the list of products and render a Card component for each product
      {data.map((product) => (
        <Card key={product.id} {...product} />
      ))}
      </div>
    </div>
  )
}
```

A few things to note here. You'll see we are using the product's `id` value as the `key`. This is a React best practice, when iterating over data, you must always define the `key`, this ensues that the rendered component is unique in the shadow DOM. You can read more about it here: <https://reactjs.org/docs/lists-and-keys.html#keys>. You'll also see we are using the spread operator to pass the product data to the `Card` component. This is a convenient way to pass all of the product data to the `Card` component. You can read more about it here: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>.

7. Great. Now we can see our products, but we don't have any pagination. Let's add that in real quick. We already have a component called `Button.jsx` in the `components` directory. This component will be responsible for rendering a button. We will use this component to create the "Next" and "Previous" buttons in the `CardList` and connect them to a pagination function. Let's update our `CardList` component to render the "Next" and "Previous" buttons. Don't forget to update your imports!

```jsx
// ....

  return (
    <div className="cf pa2">

      <div className="mt2 mb2">
        // Using the data prop, we map over the list of products and render a Card component for each product
        {data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" />
        <Button text="Next" />
      </div>
    </div>
  )
```

If you visit your application in the browser, you should see the "Next" and "Previous" buttons rendered at the bottom of the page. However, there is no functionality yet. Let's add that next. To do this, we are going to use the `useState` and `useEffect` hook. The `useState` hook allows us to create state variables in functional components. You can read more about it here: <https://reactjs.org/docs/hooks-state.html>. Let's add the `useState` hook to our `CardList` component.

```jsx
// CardList.jsx
// Import the useState and useEffect hook
import React, { useState, useEffect } from "react";
```

```jsx
// CardList.jsx
// define the limit state variable and set it to 10
const limit = 25;
// Define the default dataset, using slice to get the first 10 products
const defaultDataset = data.slice(0, limit);

// Define the offset state variable and set it to 0
const [offset, setOffset] = useState(0);
// Define the products state variable and set it to the default dataset
const [products, setProducts] = useState(defaultDataset);

// Define the handlePrevious function
const handlePrevious = () => {
  // set the offset to the previous 10 products
  setOffset(offset - 10);
}

// Define the handleNext function
const handleNext = () => {
  // set the offset to the next 10 products
  setOffset(offset + 10);
}

// Define the useEffect hook
// This hook will run every time the offset or limit state variables change
// It will update the products state variable to the next 10 products
useEffect(() => {
  // set the products state variable to the next 10 products
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]);
```

There is a lot to unpack here. Essentially, we are using the `useState` hook to create two state variables, `offset` and `products`. We are also using the `useEffect` hook to update the `products` state variable when the `offset` state variable changes. This is a very common pattern when working with React. You can read more about it here: <https://reactjs.org/docs/hooks-effect.html>. By using the `useState` variables, we are able to store the value of the offset and the subset of products in the component and pass them to child components. The `handleNExt` and `handlePrevious` functions are responsible for updating the `offset` state variable. This will trigger the `useEffect` hook and update the `products` state variable. This will cause the `CardList` component to re-render and display the next 10 products.

Finally, let's pass the `handleNext` and `handlePrevious` functions to the `Button` component. We can do this by passing them as props. The `Button` component is already configured to receive a `handleClick` prop, which will be registered to the `onClick` event handler of the component. Let's update our `CardList` component to pass the `handleClick` prop to the `Button` component.

```jsx
// CardList.jsx

// ...
      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>

```

8. Alright. So now we have one final piece of the app to add before passing this off to you to complete. When a user clicks on a single card, they should be able to view more details about the product. We already have a component, called `SingleView` in the components directory. This component is responsible for rendering a single product. We are going to use a package called React Router to handle the routing of our application. React Router is a popular package for handling routing in React applications. You can read more about it here: <https://reactrouter.com/web/guides/quick-start>. It is already installed and registered through our app, so let's add it to our `App.jsx`.

```jsx
// App.jsx
import { Route, Routes} from 'react-router-dom';

// ...
function App() {
  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
        </Routes>
      
    </div>
  );
}
```

React Router works very similar to how we registered routes in Express, except it is routing on the client side. What this means is that instead of sending a request to the server, React Router will render the appropriate component based on the URL. We are using the `Routes` component to wrap our routes. The `Routes` component is responsible for rendering the appropriate component based on the URL. We are also using the `Route` component to define our routes. The `Route` component takes a `path` prop, which is the URL path that the component should be rendered on. The `Route` component also takes an `element` prop, which is the component that should be rendered when the URL matches the `path` prop. We are also passing the `productData` prop to the `SingleView` component. This is because we need to pass the data to the component so that it can render the appropriate product.

Great job! If you open the application in your browser window now, you should be able to click on a single product and view a detailed view about it. You can also click on the `Previous` and `Next` buttons to view the next 10 products.

## Your Task

1. Add the ability to filter by tags. A `Search` component already exists. This component is configured to receive a `handleSearch` prop. This prop will be registered to the `onChange` event handler of the component. This means that when the user types in the search input, the `handleSearch` function will be called. The `handleSearch` function will receive the value of the input as an argument. You can use this value to filter the products by tags. You will need to complete the following:
   a. Import the `Search` component into the `CardList` component and place it above the cards themselves.
   b. Create a `filterTags` function in the `CardList`. This function should receive a string and filter the `data` prop by tags. Remember how we did this in Lab 4. We had to use the `filter` method and on each product we had to check if the `tags` array included the search term. You can use the same logic here.
   c. After you've filtered the products in the `filterTags`, you'll need to update the `offset` and the `products` state variables. The `useEffect` hook will listen to the change and re-render the component with the new products.
   d. Lastly, pass the `filterTags` function to your `Search` component as the `handleSearch` prop.

2. Optimize the pagination functionality:
   a. Refactor the `handlePrevious` and `handleNext` functions into a single function that takes a parameter. Update how the handler is passed to the `Button` component accordingly.
   b. Add logic to disable the `Next` button when the user reaches the end of the products list.

3. Enhance the tag filtering functionality:
   a. Implement the ability to search for multiple tags simultaneously. For example, if a user searches for "red" and "blue", the results should show all products tagged with both "red" and "blue".
   b. Use the `includes` method to check if the `tags` array contains all search terms.

## Guidance and Testing

- We are using Tachyons for styling. You can find the documentation here: <https://tachyons.io/docs/>. This is a minimal CSS framework that we will be using throughout the course. It is very easy to use and will help you focus on the core concepts of the course.

## Submission

Once you have completed the lab, please submit your code to the Replit classroom. You can do this by clicking the "Share" button in the top right corner of the Replit editor. Then, click the "Share to Classroom" button. You should see a list of classes that you are enrolled in. Select the class that you are enrolled in and click the "Share" button. You should see a message that your code has been shared with the class. You can now close the share window.

# Getting Started with GitHub and Codespaces

Welcome to the course! In this guide, you’ll learn how to set up your coding environment using GitHub and Codespaces. By following these steps, you’ll be able to work on your lab assignments, write and test your code, and submit your work for review. Let's get started!

## Step 1: Fork the Repository

Forking a repository means making a copy of it under your GitHub account. This allows you to make changes without affecting the original project.

1. **Open the Repository**: Start by navigating to the GitHub repository link provided by your instructor.
2. **Click "Fork"**: In the top-right corner, find the “Fork” button and click it.
3. **Select Your Account**: Choose your GitHub account as the destination for the fork. Once done, you’ll be redirected to your forked copy of the repository.

   > **Tip**: Make sure you’re logged into your GitHub account, or you won’t see the option to fork!

## Step 2: Open the Repository in Codespaces

With your forked repository ready, you can now set up a development environment using Codespaces. This setup provides a pre-configured environment for you to code in, with everything you need to complete the lab.

1. **Open the Codespaces Menu**:
   - In your forked repository, click the green "Code" button, then switch to the "Codespaces" tab.
2. **Create a Codespace**:
   - Click on "Create codespace on main" to start the setup.
3. **Wait for Codespaces to Load**:
   - It may take a few minutes for Codespaces to create and configure your environment. Be patient, as it’s setting up all the tools you’ll need.
4. **Start Coding**:
   - Once the setup is complete, Codespaces will automatically open a new browser tab where your code will be ready to run. You’ll be able to see the code and any outputs as you go through the lab assignment.

## Step 3: Complete the Lab Assignment

Inside the Codespaces environment, you’ll find all the files and instructions you need. Follow the steps outlined in the README file to complete your assignment.

1. **Read the Instructions**: Carefully go through the README file to understand the tasks you need to complete.
2. **Edit the Code**: Make the necessary changes to the code files as instructed.
3. **Run and Test Your Code**: Use the terminal and editor within Codespaces to run your code and make sure everything works as expected.

   > **Hint**: If you’re stuck, try reviewing the README file again or refer to any resources provided by your instructor.

## Step 4: Submit Your Work via Pull Request

Once you’ve completed the assignment, it’s time to submit your work. You’ll do this by creating a pull request, which is a way to propose your changes to the original repository.

1. **Commit Your Changes**:
   - Save your work by committing your changes. In Codespaces, go to the Source Control panel, write a commit message, and click "Commit" to save your changes.
2. **Push to Your Fork**:
   - After committing, click "Push" to upload your changes to your forked repository on GitHub.
3. **Create a Pull Request**:
   - Go back to your GitHub repository, and you’ll see an option to “Compare & pull request.” Click it to start your pull request.
   - Include your name in the pull request description so your instructor knows who submitted it.
4. **Submit the Pull Request**:
   - Click "Create pull request" to submit your work for review. Your instructor will be notified and can review your work.

And that’s it! You’ve now completed your first lab assignment using GitHub and Codespaces. Well done!

### Additional Steps

1. Open the terminal in Codespaces.
2. Run the following commands to install dependencies and start the development server:
    ```sh
    npm install
    npm run dev
    ```
3. You can now view the project in the browser by clicking the "Application" port in the Ports panel.

Follow the instructions in the previous sections to complete the lab.