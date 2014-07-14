#!/home/vagrant/.rvm/rubies/ruby-2.1.1/bin/ruby

a = []
print "{ \"arr\": ["
(1..20).each do |x|
	a << (rand(25) + 1).to_s
end
print a.join(",")
print "] }"
	
