# Petitions Chrome Extension


I had an idea to create a chrome extension that related to the government petition site and getting more people become active in so much as signing more petitions.

Currently on clicking the icon a popup occurs, loads the petitions in, then the user can select either a random petition, start a new petition or view the headline based petition. It then displays the current signature count and gives the user an option to visit the page of the specific petition.

This extension can be used on any news website.

The idea is to publish on the chrome extension store for free once complete.

## Installation

`git clone git@github.com:LondonJim/Chrome-Extension-Petitions.git`

Currently to install you will have to enter developer mode on your chrome extensions page.

`chrome://extensions` to access page

Toggle Developer Mode on the right hand side

Click on Load unpacked and select the folder of the extension

## Recently Completed

```
As a user,
So I can see relevant petitions,
The petitions are based on a current news item I'm viewing.
```

This involves matching petition title text and petition paragraph text to the current page news item text. The user may see petitions that are completely against what they believe but will at least give them an idea of the petitions on the subject.

## Using cosine similarity to match headlines and petition content

Involves cleansing of the strings and using cosine similarity code from https://medium.com/@sumn2u/cosine-similarity-in-ember-js-2ba419d06462 to match headlines to petitions. Have used various string matrix algorithms and seem to be getting best results from the current code, although not perfect.

## Still to complete

```
As a user,
So I can view more than one relevant petition,
The headline based petitions can be offered in order of relevance
```

```
As a user,
So I do not get totally irrelevant results,
I get notification of no relevant petitions found
```

## Current example
![Image description](./assets/screen-shot.png)
