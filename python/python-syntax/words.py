def print_upper_words(words, must_start_with={}):
    
    for word in words:
        if not must_start_with:
            print(word.upper())
        elif word[0].lower() in must_start_with:
            print(word.upper())
            
# this should print "HELLO", "HEY", "YO", and "YES"

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})

