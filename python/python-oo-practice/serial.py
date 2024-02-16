"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def _init_(self, start):
        """Creates a new instance of Serial Generator, starting value set to passed in parameter and generate count set to zero."""
        self._serial_number = start
        self.count = 0
    
    def generate(self):
        """Returns the sum of the generator's start value and the current count of generate() calls."""
        return_value = self.start_value + self.count
        self.count += 1
        return  return_value
    
    def reset(self):
        """Resets the counter of generate() calls to zero."""
        self.count = 0
