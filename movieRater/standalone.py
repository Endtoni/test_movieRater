def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    if not s:
        return 0
    longestLength = 1
    lowIndex = 0
    highIndex = 1
    length = len(s)
    while(highIndex < length and lowIndex<length):
        current = s[highIndex]
        if current in s[lowIndex: highIndex]:
            duplicate = lowIndex + s[lowIndex: highIndex].index(current)
            lowIndex = duplicate + 1
        elif(highIndex + 1 - lowIndex) > longestLength:
            longestLength = highIndex + 1 - lowIndex
        highIndex = highIndex + 1

    return longestLength

print(lengthOfLongestSubstring('abc'))