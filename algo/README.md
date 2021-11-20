# How to run the code

1. In terminal change your directory to `cd <path_to_repo>/mega-fs-assignments/algo` 
2. In terminal type `python main.py`
3. See the results at terminal
4. In case you want to see testing results type `python test.py`

</br>

# How the code work
1. Check edge case if the length of `wordList` is 0 or it contains only one empty string, then it will return `None` before doing calculation in normal cases.
2. Create an empty dict called `pairs`
3. Iterate through the `wordList`
   1. Try to split the `target` string with each `word`, example results of `splitWords` will be `['', 'cd']`, `['a', 'd']`, `['ab', '']`
   2. If length of `splitWord` is 1, it mean that `target` can't be split by `word`
   3. Create variable `remainingWord` to determine the remaining word that can be combined with `word` and equal to `target` string, then store the `remainingWord` into the dict `pairs`
   4. Check if `word` is inside `pairs`
      1. if `splitWord[0] == ''` the current `word` should be at the front of the `remainingWord`
      2. if `splitWord[1] == ''` the current `word` should be after of the `remainingWord`
4. Return `None` if condition inside `3.` not met

<br/>

# Time and Space complexity

## Time complexity

1. This section of code is running at constant time => O(1)
    ```
    if (len(wordList) == 0 or (len(wordList) == 1 and wordList[0] == '')):
        return None
    ```

2. 