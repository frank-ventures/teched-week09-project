# Week Nine Project

## Project - Build a social network

**Link to project:** [Link]()

![image]()

Continuing with Next.js and adding user authentication with the magic that is Clerk, we build a rudimentary 'social network' this week.

I chose to use Supabase for database hosting, with the site hosted on Vercel.

I kept track of my ideas, planning and progress here: [Planning](https://frankjs.notion.site/Day-Thirty-Nine-Project-24d3bd4839434c17bba360ad24613769?pvs=4)

I call it, **The Void**, because when we post online in places like this, it's kind of where we are shouting into.

### Requirements & Deliverables

- Use Clerk.com to set up user signup and login.

- Use the Clerk userId to associate posts with a user.

- Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].

- Enable users to create posts associated with the userId, and display those posts on the user's profile page

- Show a 404 error if a user profile doesn't exist

- Use at least 1 Radix UI Primitive or similar

**Stretch Goals**

- Enable users to visit other user profiles after seeing their posts on a global timeline

- Enable users to follow other users by creating a follower and follwee relationship between two user profiles

- Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table

- A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

### User Stories

- As a user, I am able to sign up for an account and create a user profile
- As a user, I am able to log in and out of my account
- As a user, I am able to create posts on my profile timeline
- As a user, I am able to see all posts by all users on a global timeline

### Stretch Stories

- As a user, I am able to see a list of other user's posts and/or profiles on the site
- As a user, I am able able to visit other user profiles
- As a user, I am able to follow other users
- As a user, I am able to like posts I think are good, and see how many likes a post has

## The Outcome!

### Features!

-
- Radix Avatar component

### What went well

**Planning**

- **DrawSQL**
  DrawSQL to the rescue, as in previous weeks. What a great tool!
  ![my database plan]()

  I adore Supabases' SQL Editor and used it again this week to construct my database.

**Components**

Practice in prior weeks has given me a good understanding of how to make components, when are where to use them, and also I've just found them a joy.

I feel like I have got a good grasp on making my apps/websites modular which helps in keeping code clean and readable.

- **Functionality**

- **User Interface and Design**

### Sticky points and Difficulties

**New User making their first post get DENIED**
talk about alexs bug and then fixing it with a conditional in the image
**Two**

### Future Additions

### Resources

DrawSQL - [My DrawSQL]()

hamburger help https://jacobhocker.medium.com/creating-an-animated-hamburger-menu-in-nextjs-tailwind-css-9e332d428811

Box Shadow help - [CSS Inner Box Shadow](https://devdevout.com/css/css-inner-shadow)

LDRS - Loading Spinners Library _(I figured out you need to make the component "use client")_ - [LDRS Library](https://uiball.com/ldrs/)
