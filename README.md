# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**


Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance


**Developer comments**


**Question 1**

From my understanding, question 1 is asking me to verify if the data in the input field has been altered, when a user hits verify data, the user will be alerted that the data in the field has been edited (i assume edits are saved to the "database" object via the update data button ), otherwise the verifying the data will inform the user that their data is intact.

to achieve this i implemented a simple system for generating a unique cryptographic hash key that will be added to the database upon each new creation/update of database entry (a hash key will be generated for the the default value of "hello world" in this case for simplicity )

i have edited the database object to be an array of objects, each object will represent an action on the database and will have a corresponding hash key eg: const database = [{ data: "Hello World", hash: "" }];
database  = [{ data: "Hello World", hash: "" }, { data: "Hello Worlds", hash: "ryr63n57745h9494hy58" }, ];

if the data is updated, then it will be stored to the array as a object with a new hash value, then when the user verifies their data intergrity, the hashes of the current entry and the initial entry and if the hashes do not match the user will be notified that their data has been edited.  

**Question 2**

Due to my implementation of an array of hash objects in question 1, if the data does not match then the user will be asked if they would like to roll back their data or save the updated changes. if they roll back, the values of the data and hash at the first index pof the array will be used as the default value and the remaining entries will be deleted 