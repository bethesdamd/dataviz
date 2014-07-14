#!/home/vagrant/.rvm/rubies/ruby-2.1.1/bin/ruby

# Utility to generate random data sets for testing. Use in conjuction with '>>' on the command line
# to create a data file.

a = []
print "{ \"arr\": ["
(1..20).each do |x|
	a << (rand(25) + 1).to_s
end
print a.join(",")
print "] }"
	
