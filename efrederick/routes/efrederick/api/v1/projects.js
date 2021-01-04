const express = require('express');

//Models
const getConnection = require('../../../../models/createPool');
const getQuery = require('../../../../models/createQuery');

const router = express.Router();

//Services
const getRepoList = require('../../../../services').getRepoList;
const getRepo = require('../../../../services').getRepo;

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        if(!error && connection){
            await getQuery(connection, {
                queryRequest:{
                    id: 'ghub:1',
                    origin: 'github'
                },
                queryTargetItems: 'api_key_value',
                queryTargetTable: 'api_keys',
                queryIsBinary: true
            })
            .then(result => {
                if(result.length === 0){
                    res.status(401).json({
                        success: false,
                        description: 'Invalid key data'
                    });
                }else{
                    const {Headers} = require('node-fetch');
                    const myHeaders = new Headers();
                    const projectsSorted = [];

				    myHeaders.append('authorization', `token ${result[0].api_key_value}`);

                    getRepoList('pepeyen', myHeaders)
                    .then(projects => {
                        projects.forEach(repository => {
                            if(repository.homepage && repository.name !== 'efrederick'){
                                projectsSorted.push({
                                    repositoryName: repository.name,
                                    reporitoryThumbnailURL: `https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/master/.github/images/project-thumbnail.png`,
                                    repositoryURL: repository.html_url,
                                    repositoryDemoURL: repository.homepage
                                });
                            }
                        });

                        return projects;
                    })
                    .then(data => {
                        return data.map(currentRepo => getRepo('pepeyen', currentRepo.name, myHeaders)
                        .then(contributors => contributors
                            .map(contributor => contributor.weeks
                                .reduce((lineCount, week) => lineCount + week.a - week.d, 0)
                            )
                        )
                        .then(lineCounts => {
                            return lineCounts.reduce((lineTotal, lineCount) => {
                                return lineTotal + lineCount;
                            });
                        })
                        .then(lines => {
                            return lines;
                        }))
                    })
                    .then(result => {
                        return Promise.all(result);
                    })
                    .then(linesOfCodeList => {
                        let totalLinesOfCode = 0, totalNumberOfRepos = 0;
    
                        linesOfCodeList.map(currentRepoLinesOfCode => {
                            if(currentRepoLinesOfCode >= 300){
                                totalLinesOfCode = totalLinesOfCode + Math.round(currentRepoLinesOfCode * 0.01);
                            }else{
                                totalLinesOfCode = totalLinesOfCode + currentRepoLinesOfCode;
                            }
                            
                            return null;
                        })

                        totalNumberOfRepos = linesOfCodeList.length;

                        res.status(200).json({
                            success: true,
                            projects: {
                                count: totalNumberOfRepos,
                                totalLOC: totalLinesOfCode,
                                list: projectsSorted
                            }
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            success: false,
                            description: 'Server error, please try again'
                        });
                    })
                }
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    description: 'Server error, please try again'
                });
            })
            
            connection.release();
        }else{
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
    });
});

module.exports = router;