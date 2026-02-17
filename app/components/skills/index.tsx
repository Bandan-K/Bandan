'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skill } from '../../lib/services/profile';
import { CATEGORY_STYLES, CategoryKey } from './constants';
import SkillCard from './SkillCard';
import SkillModal from './SkillModal';

const SkillsSection = ({ initialSkills }: { initialSkills?: Skill[] }) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [fetchedSkills, setFetchedSkills] = useState<Skill[]>(initialSkills || []);
    const [isLoading, setIsLoading] = useState(!initialSkills);

    useEffect(() => {
        if (initialSkills) {
            setFetchedSkills(initialSkills);
            setIsLoading(false);
            return;
        }
        const fetchSkills = async () => {
            try {
                const docRef = doc(db, 'ProfileDetails', 'MyDetail');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.skillsSection) {
                        setFetchedSkills(data.skillsSection as Skill[]);
                    }
                }
            } catch (error) {
                console.error("Error fetching skills: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, [initialSkills]);

    const handleSkillClick = (skill: Skill) => {
        setSelectedSkill(skill);
        trackEvent('skill_view', {
            skill_name: skill.name,
            skill_category: skill.category
        });
    };

    const categories: CategoryKey[] = ['core', 'frameworks', 'tools'];

    return (
        <section className="py-16 md:py-20 relative" id="skills">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Technical Expertise</h2>
                <p className="text-sm sm:text-base text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                    Specialized in modern iOS application development technologies and frameworks
                </p>

                <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
                    {categories.map((catKey) => (
                        <div key={catKey} className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-800/50 pb-4">
                                <div className="p-2 rounded-lg bg-gray-800/30">
                                    {CATEGORY_STYLES[catKey].sectionIcon}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-100">
                                    {CATEGORY_STYLES[catKey].sectionTitle}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {fetchedSkills.filter(s => s.category === catKey).map((skill) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        onClick={handleSkillClick}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedSkill && (
                    <SkillModal
                        skill={selectedSkill}
                        onClose={() => setSelectedSkill(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default SkillsSection;
