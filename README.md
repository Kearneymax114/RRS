# RRS
An ATS system for delivery drivers

Summary:
This program pools courier applicants and, after distilling, distributes eligible candidates to DSP companies seeking drivers.

The process flow of this program is as follows:
1. Candidates interested in becoming a courier complete a web form and submit their resume.
2. Web form responses are populated in a SQLite Database.
3. Distilling phase 1 takes place. Candidate responses are parsed. Candidates are automatically rejected if specific criteria are met, and their profile status is updated to reflect this.
4. The remaining candidates have their information manually reviewed and are ranked based on previous experience.
