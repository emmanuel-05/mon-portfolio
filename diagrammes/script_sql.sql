
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

TRUNCATE TABLE 
    projets_technologie,
	projets_projet,
    projets_projet_technologies
RESTART IDENTITY CASCADE;

SELECT * FROM
	projets_technologie,
	projets_projet,
    projets_projet_technologies
