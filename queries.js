/*SHOW ALL USERS*/
match (n) return n;

/*DELETE ALL RELATIONS AND USERS*/
match (n)-[r:Knows]->(m),(n) delete r,n,m

/*CREATE USERS*/
create 
(an:Person{name:"Anup"}),
(si:Person{name:"Sirsendu"}),
(so:Person{name:"Soumya"}),
(db:Person{name:"Debashis"}),
(ko:Person{name:"Koustav"}),
(je:Person{name:"Jeyashree"}),
(ib:Person{name:"Indranil"}),
(ku:Person{name:"Kunal"}),
(ma:Person{name:"Mark"}),
(mi:Person{name:"Midhun"}),
(lp:Person{name:"Larry"}),
(su:Person{name:"Sundar"})



/*MATCH USERS*/
match
(an:Person{name:"Anup"}),
(si:Person{name:"Sirsendu"}),
(so:Person{name:"Soumya"}),
(db:Person{name:"Debashis"}),
(ko:Person{name:"Koustav"}),
(je:Person{name:"Jeyashree"}),
(ib:Person{name:"Indranil"}),
(ku:Person{name:"Kunal"}),
(ma:Person{name:"Mark"}),
(mi:Person{name:"Midhun"}),
(lp:Person{name:"Larry"}),
(su:Person{name:"Sundar"})

create
(an)-[:Knows]->(si),
(an)-[:Knows]->(so),
(an)-[:Knows]->(db),
(ko)-[:Knows]->(si),
(je)-[:Knows]->(ko),
(an)-[:Knows]->(ko),
(mi)-[:Knows]->(si),
(mi)-[:Knows]->(lp),
(lp)-[:Knows]->(ma),
(ib)-[:Knows]->(si),
(ku)-[:Knows]->(si),
(su)-[:Knows]->(lp)



//=============================== SHORTEST PATH BT SOU AND MAR
match (so:Person{name:"Soumya"}), (ma:Person{name:"Mark"}), p = shortestPath((so)-[:Knows*]-(ma)) return so,ma,p




