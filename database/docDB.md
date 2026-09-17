## CRUD
These are the four fundamental SQL commands :
	- **CREATE** : add data
	- **READ** : read data
	- **UPDATE** : modify data
	- **DELETE** : delete data

## ACID
ACID is a set of four properties that ensure a database transaction remains reliable and consistent, even in the event of an error, simultaneous access by multiple users, or an interruption :
  - Atomicity : a transaction is completed in its entirety or not at all.
  - Consistency : in the event of an error during a transaction, the state reverts to what it was prior to the transaction.
  - Isolation : a transaction does not interfere with the others.
  - Durability : the data remains available in the event of a restart.

## MVCC
**M**ulti-**V**ersion **C**oncurrency **C**ontrol is a computing method used in database management systems to allow multiple users to read and write data simultaneously without blocking each other.

## Ressources
	* https://www.postgresql.org/docs/current/
	* https://fr.wikipedia.org/wiki/Propri%C3%A9t%C3%A9s_ACID
	* https://fr.wikipedia.org/wiki/Multiversion_Concurrency_Control
