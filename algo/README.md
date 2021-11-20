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
let `N` be number of item in `wordList` and `M` be length of `target` string
```
def solve(wordList, target):
    if (len(wordList) == 0 or (len(wordList) == 1 and wordList[0] == '')): --> O(1)
        return None

    pairs = {} --> O(1)

    for word in wordList:
        splitWord = target.split(word) --> O(M)

        if (len(splitWord) == 1): --> O(1)
            # Can't split target by word
            continue

        matchingWord = splitWord[1] if splitWord[0] == '' else splitWord[0] --> O(1)
        pairs[matchingWord] = True --> O(1)

        if (word in pairs): --> O(1)
            if (splitWord[0] == ''):
                return (word, matchingWord)
            if (splitWord[1] == ''):
                return (matchingWord, word)

    return None --> O(1)
```

Total time complexity = O(1) + O(1) + N*(O(M)+O(1)+O(1)+O(1)+O(1)) + O(1)
    ```
    = O(NM)
    ```
    
## Space complexity
let `N` be number of item in `wordList`

Total space complexity = O(N)

because the statement `pairs[matchingWord] = True` will allocate new key in dictionary N times in the worst case scenario