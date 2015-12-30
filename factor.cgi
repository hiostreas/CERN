#!/usr/bin/perl

use CGI; 
use strict;
use warnings;

my $q= new CGI; 									#Create a CGI object
my $numberToFactorize = $q->param("NumberToSend");	# Import the number to factorize
my $numberWasFactorized = $numberToFactorize; 		# Save the number to factorize
my $listPrimeNumbers;	  							# This is the list of the Prime Numbers
my $i;												# Variable for the "for loop"
my $message; 										# Message to the client
    # Print the number of 2s that divide the $numberToFactorize
    while (($numberToFactorize % 2) == 0){
        $listPrimeNumbers =$listPrimeNumbers . "2  ";
        $numberToFactorize = $numberToFactorize / 2;
    }
    # $numberToFactorize must be odd at this point.
    # So we can skip one element (Note $i = $i+2)
    for ($i = 3; $i <= ($numberToFactorize ** (1 / 2)); ($i = $i + 2))
    {
        # While $i divides $numberToFactorize, print $i and divide $numberToFactorize
        while ($numberToFactorize % $i == 0)
        {
            $listPrimeNumbers =$listPrimeNumbers . $i . "  ";
            $numberToFactorize = $numberToFactorize / $i;
        }
    }
    
    # This condition is to handle the case when $numberToFactorize is a prime number
    # greater than 2
	if($numberToFactorize > 2){
		         $listPrimeNumbers =$listPrimeNumbers . $numberToFactorize . "  ";
   
	}
	
	# Check if the number that came from the client is prime or not and if it is equals 1
	# depending it it is or not me message is different
	if((($numberToFactorize == $numberWasFactorized) &&  ($numberToFactorize>1))||($numberWasFactorized==2)){
		# This message is sent in case that the input number was prime
		$message ="the number $numberWasFactorized is prime";
	}elsif($numberWasFactorized == 1){
		# This message is sent if the input number is 1
		$message="1 is not a prime number it is a unity";
	}else{
		# This is the message with the prime numbers resulted from the input number's factorization
		$message="$numberWasFactorized was factorized and its prime numbers are: $listPrimeNumbers";
	}
	
#the header must be always set
print $q->header(-type=>"text/plain", -Access_Control_Allow_Origin=>"*");

#the final message is sent to the client
print $message;
exit;