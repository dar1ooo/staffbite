using business_logic.Interfaces;
using business_logic.Models;
using MongoDB.Driver;

namespace business_logic.Services
{
    public class SkillsService : ISkillsService
    {
        private MongoCRUD MongoCRUD { get; set; }
        private string collection { get; set; }

        public SkillsService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "staffbite");
            collection = "Skills";
        }

        /// <summary>
        /// save skills to db
        /// </summary>
        /// <param name="skills"></param>
        public void SaveSkills(List<TeacherSkills> skills)
        {
            MongoCRUD.ClearTable<TeacherSkillsMongoDb>(collection);

            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");

            #region UpdateSkills in Db

            foreach (TeacherSkills sk in skills)
            {
                TeacherSkillsMongoDb skill = new TeacherSkillsMongoDb();

                if (string.IsNullOrEmpty(sk.Id))
                {
                    skill.Id = Guid.NewGuid();
                }
                else
                {
                    skill.Id = new Guid(sk.Id);
                }

                sk.Id = skill.Id.ToString();

                skill.SkillTopic = sk.SkillTopic;

                foreach (SkillLevel skillLevel in sk.SkillLevels)
                {
                    SkillLevelMongoDb skillLevelMongoDb = new SkillLevelMongoDb();

                    foreach (SubSkill subSkill in skillLevel.SubSkills)
                    {
                        SubSkillMongoDb subSkillMongoDb = new SubSkillMongoDb();

                        if (string.IsNullOrEmpty(subSkill.Id))
                        {
                            subSkillMongoDb.Id = Guid.NewGuid();
                        }
                        else
                        {
                            subSkillMongoDb.Id = new Guid(subSkill.Id);
                        }
                        subSkill.Id = subSkillMongoDb.Id.ToString();
                        subSkillMongoDb.Description = subSkill.Description;
                        subSkillMongoDb.PdfUrl = subSkill.PdfUrl;
                        subSkillMongoDb.VideoUrl = subSkill.VideoUrl;
                        subSkillMongoDb.IsChecked = false;
                        subSkillMongoDb.ShowPdf = subSkill.ShowPdf;
                        subSkillMongoDb.ShowVideo = subSkill.ShowVideo;

                        skillLevelMongoDb.SubSkills.Add(subSkillMongoDb);
                    }

                    skill.SkillLevels.Add(skillLevelMongoDb);
                }

                MongoCRUD.InsertRecord<TeacherSkillsMongoDb>(collection, skill);
            }

            #endregion UpdateSkills in Db

            #region Update All Users

            foreach (MongoDbUser user in users)
            {
                #region Add new Skills or update edited skills

                foreach (TeacherSkills teacherSkill in skills)
                {
                    TeacherSkills foundSkill = user.TeacherSkills.FirstOrDefault(x => x.Id == teacherSkill.Id);

                    if (foundSkill == null)
                    {
                        user.TeacherSkills.Add(teacherSkill);
                    }
                    else
                    {
                        int i = 0;

                        foreach (SkillLevel skillLevel in teacherSkill.SkillLevels)
                        {
                            foreach (SubSkill subSkill in skillLevel.SubSkills)
                            {
                                SubSkill foundSubSkill = foundSkill.SkillLevels[i].SubSkills.FirstOrDefault(x => x.Id == subSkill.Id);

                                if (foundSubSkill == null)
                                {
                                    foundSkill.SkillLevels[i].SubSkills.Add(subSkill);
                                }
                                else
                                {
                                    foundSubSkill.Description = subSkill.Description;
                                    foundSubSkill.PdfUrl = subSkill.PdfUrl;
                                    foundSubSkill.VideoUrl = subSkill.VideoUrl;
                                    foundSubSkill.ShowPdf = subSkill.ShowPdf;
                                    foundSubSkill.ShowVideo = subSkill.ShowVideo;
                                }
                            }
                            i++;
                        }
                    }
                }

                #endregion Add new Skills or update edited skills

                #region Delete Non existing Skills on Users

                List<TeacherSkills> skillsToDelete = new List<TeacherSkills>();
                List<SubSkillToDelete> subSkillsToDelete = new List<SubSkillToDelete>();
                int skillIndex = 0;

                foreach (TeacherSkills teacherSkill in user.TeacherSkills)
                {
                    TeacherSkills foundSkill = skills.FirstOrDefault(x => x.Id == teacherSkill.Id);

                    if (foundSkill == null)
                    {
                        skillsToDelete.Add(teacherSkill);
                    }
                    else
                    {
                        int skillLevelIndex = 0;
                        int subSkillIndex = 0;

                        foreach (SkillLevel skillLevel in teacherSkill.SkillLevels)
                        {
                            foreach (SubSkill subSkill in skillLevel.SubSkills)
                            {
                                SubSkill foundSubSkill = foundSkill.SkillLevels[skillLevelIndex].SubSkills.FirstOrDefault(x => x.Id == subSkill.Id);

                                if (foundSubSkill == null)
                                {
                                    subSkillsToDelete.Add(new SubSkillToDelete()
                                    {
                                        SkillIndex = skillIndex,
                                        SubSkillIndex = subSkillIndex,
                                        SkillLevelIndex = skillLevelIndex
                                    });
                                }
                                subSkillIndex++;
                            }
                            subSkillIndex = 0;
                            skillLevelIndex++;
                        }
                    }
                    skillIndex++;
                }

                foreach (TeacherSkills skill in skillsToDelete)
                {
                    user.TeacherSkills.Remove(skill);
                }

                foreach (SubSkillToDelete subSkill in subSkillsToDelete)
                {
                    user.TeacherSkills[subSkill.SkillIndex].SkillLevels[subSkill.SkillLevelIndex].SubSkills.RemoveAt(subSkill.SubSkillIndex);
                }

                #endregion Delete Non existing Skills on Users

                //filter to find which user to update
                var update = Builders<MongoDbUser>.Update
                .Set(p => p.TeacherSkills, user.TeacherSkills)
                .Set(p => p.Username, user.Username)
                .Set(p => p.Email, user.Email);

                MongoCRUD.UpsertRecord<MongoDbUser>("Users", user.Id, update);
            }

            #endregion Update All Users
        }

        /// <summary>
        /// get all skills
        /// </summary>
        /// <returns></returns>
        public List<TeacherSkills> GetAllSkills()
        {
            return MongoCRUD.LoadRecords<TeacherSkills>(collection);
        }

        /// <summary>
        /// get teacher skills from db
        /// </summary>
        /// <returns></returns>
        public List<TeacherSkills> GetSkills()
        {
            List<TeacherSkills> teacherSkills = new List<TeacherSkills>();
            List<TeacherSkillsMongoDb> skills = MongoCRUD.LoadRecords<TeacherSkillsMongoDb>(collection);

            //add to return list
            foreach (TeacherSkillsMongoDb sk in skills)
            {
                TeacherSkills teacherSkill = new TeacherSkills();
                teacherSkill.SkillTopic = sk.SkillTopic;
                teacherSkill.Id = sk.Id.ToString();

                foreach (SkillLevelMongoDb skillLevelMongoDb in sk.SkillLevels)
                {
                    SkillLevel skillLevel = new SkillLevel();

                    foreach (SubSkillMongoDb subSkillMongoDb in skillLevelMongoDb.SubSkills)
                    {
                        SubSkill subSkill = new SubSkill();
                        subSkill.Id = subSkillMongoDb.Id.ToString();
                        subSkill.Description = subSkillMongoDb.Description;
                        subSkill.IsChecked = false;
                        subSkill.VideoUrl = subSkillMongoDb.VideoUrl;
                        subSkill.PdfUrl = subSkillMongoDb.PdfUrl;
                        subSkill.ShowPdf = subSkillMongoDb.ShowPdf;
                        subSkill.ShowVideo = subSkillMongoDb.ShowVideo;
                        skillLevel.SubSkills.Add(subSkill);
                    }

                    teacherSkill.SkillLevels.Add(skillLevel);
                }

                teacherSkills.Add(teacherSkill);
            }

            return teacherSkills;
        }
    }
}