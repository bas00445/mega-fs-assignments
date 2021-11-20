# How to run the code

1. In terminal change your directory to `cd <path_to_repo>/mega-fs-assignments/algo` 
2. In terminal type `python main.py`
3. See the results at terminal
4. In case you want to see testing results type `python test.py`
---


# How the code work
1. Check edge case if the length of `wordList` is 0 or it contains only one empty string, then it will return `None` before doing calculation in normal cases.
2. Create an empty array called `result`, which will contain list of word inside `wordList`
3. Iterate through the `wordList`
   1. Try to split the `target` string with each word, example results of `splitWords` will be `['', 'cd']`, `['a', 'd']`, `['ab', '']`
   1. If there is `''` inside the `splitWords`, it mean that the current `word` could be a pair.
   2. Clean the `splitWords` by removing `''` from them and append the remaning word to `result`
4. If the length of result is 2, meaning that there is a pair that can combine into the `target` word, but the sequence may be vice versa, so try to find a correct sequence then return the result of tuple.