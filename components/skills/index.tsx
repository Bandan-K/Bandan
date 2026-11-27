'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skill } from '@/lib/services/profile';
import { CATEGORY_STYLES, CategoryKey } from './constants';
import SkillCard from './SkillCard';
import SkillModal from './SkillModal';

const SkillsSection = ({ initialSkills }: { initialSkills?: Skill[] }) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [clientSkills, setClientSkills] = useState<Skill[]>([]);
    const fetchedSkills = initialSkills ?? clientSkills;

    useEffect(() => {
        if (initialSkills) return;
        const fetchSkills = async () => {
            try {
                const docRef = doc(db, 'ProfileDetails', 'MyDetail');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.skillsSection) {
                        setClientSkills(data.skillsSection as Skill[]);
                    }
                }
            } catch (error) {
                console.error("Error fetching skills: ", error);
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
        <section className="portfolio-shell portfolio-section" id="skills">
            <h2 data-jarvis="section:skills" className="portfolio-heading">Technical Expertise</h2>
            <p className="portfolio-intro">
                Specialized in modern iOS application development technologies and frameworks
            </p>

            <div className="space-y-8">
                {categories.map((category) => (
                    <div key={category} className="grid gap-3 border-t border-portfolio-rule pt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8">
                        <h3 data-jarvis={`category:${category}`} className="place-self-start text-lg font-semibold">
                            {CATEGORY_STYLES[category].sectionTitle}
                        </h3>
                        <div className="grid items-start gap-x-7 sm:grid-cols-2">
                            {fetchedSkills.filter((skill) => skill.category === category).map((skill) => (
                                <SkillCard key={skill.name} skill={skill} onClick={handleSkillClick} />
                            ))}
                        </div>
                    </div>
                ))}
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
