const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const topicId = '66b0ddfdf21e9002dd57e811'; // Replace with your topic ID

    const questions = [
        {
            name: 'Maximum Profit in Job Scheduling',
            link: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Basic Calculator II',
            link: 'https://leetcode.com/problems/basic-calculator-ii/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Length of the Longest Valid Substring',
            link: 'https://leetcode.com/problems/length-of-the-longest-valid-substring/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Integer to English Words',
            link: 'https://leetcode.com/problems/integer-to-english-words/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Contiguous Array',
            link: 'https://leetcode.com/problems/contiguous-array/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'String Compression II',
            link: 'https://leetcode.com/problems/string-compression-ii/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Reorganize String',
            link: 'https://leetcode.com/problems/reorganize-string/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Split Message Based on Limit',
            link: 'https://leetcode.com/problems/split-message-based-on-limit/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Bag of Tokens',
            link: 'https://leetcode.com/problems/bag-of-tokens/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Least Number of Unique Integers after K Removals',
            link: 'https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'Knight Dialer',
            link: 'https://leetcode.com/problems/knight-dialer/description/',
            topicId: topicId,
            kind: 'normal'
        },
        {
            name: 'First Missing Positive',
            link: 'https://leetcode.com/problems/first-missing-positive/description/',
            topicId: topicId,
            kind: 'normal'
        }
    ];

    // Insert the questions into the database
    for (const q of questions) {
        await prisma.question.create({
            data: q
        });
    }
    console.log('Questions inserted successfully');
}

// Run the script
main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });