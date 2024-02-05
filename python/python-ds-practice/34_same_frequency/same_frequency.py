def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    str1 = str(num1)
    str2 = str(num2)
    if len(str1) != len(str2): return False
    d1 = {}
    d2 = {}

    for num in str1:
        d1[num] = d1.get(num, 0) + 1

    for num in str2:
        d2[num] = d2.get(num, 0) + 1
    
    return d1 == d2
