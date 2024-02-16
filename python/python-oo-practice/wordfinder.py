"""Word Finder: finds random words from a dictionary."""
import random
from random import choice

class WordFinder:
    """Class for finding random words from words.txt file"""
    
    def __init__(self, file_path):
        """Constructor"""
        self.word_list = self.build_list_from_file(file_path)
        print(f"{len(self.word_list)} words read")

    def _repr_(self):
        return f"<Word Finder with {len(self.word_list)} words>"
    
    def build_list_from_file(self, file_path):
        wordList = []
        with open(file_path, 'r') as file:
            for line in file:
                text = line.strip()
                wordList.append(text)
        return wordList
    
    def random(self):
        return choice(self.word_list)
    
class NewWordFinder(WordFinder):
    """New and Improved Word Finder, omits comments (#) and empty lines in source file
    >>> new_finder = NewWordFinder("new.txt")
    4 words read

    >>> new_finder.random() in ["kale", "parsnips", "mango", "apple"]
    True
    """
    def build_list_from_file(self, file_path):
        wordList = []
        with open(file_path, 'r') as file:
            for line in file:
                if line and line[0] != '#' and not line.isspace():
                    text = line.strip()
                    wordList.append(text)
        return wordList
