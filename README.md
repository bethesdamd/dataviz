dataviz
=======

Framework for creating browser data visualizations that update automatically when data changes on the server.  
A dashboard is typically a collection of visualization elements that allow someone to graphically monitor
what's occuring in a system that changes frequently.  Typically the user wants the charts to update automatically.
The less-desired, but easier, approach to implementing this is the have the browser periodically request new
data from the server based upon a timer in JavaScript.  This approach will miss changes in the data unless you know 
when those changes occur on the server.  The better approach is the have any given chart get updated when its 
data source on the server changes.  This is the "push" model, where the server is pushing data to the browser rather
than the browser asking for a refresh. 

This software demonstrates how to implement this approach using node.js and websockets.
