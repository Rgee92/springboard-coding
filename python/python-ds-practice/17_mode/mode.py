def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    high_count = 0
    high_num = -1
    for num in nums:
        current_count = nums.count(num)
        if current_count > high_count:
            high_count = current_count
            high_num = num
    
    return high_num
