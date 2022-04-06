# crispy-happiness
This is a test

How to run it:


Some thoughts:
* I decided to do this from scratch so it's a bit harder to build :)
* In the request example, the "amount" property seems to be a string. I made the validator to ask for a number. 
I hope that's ok. (if there's a solid reason for it to be a string, I'm curious to know).
* I assumed the "amount" property is always positive.
If we're interested to also handle cases for negative amount transactions (refunds),
then I would return 0 as the commission

Todo: 
Add linter
Add config for typeorm datasource
Tests
