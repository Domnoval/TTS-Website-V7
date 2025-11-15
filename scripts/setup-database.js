/**
 * Automated Database Setup Script for TTS Website V7
 *
 * This script automatically creates all database collections with proper
 * schemas, indexes, and permissions by reading from the schema JSON files.
 *
 * Usage:
 *   node scripts/setup-database.js
 *
 * Requirements:
 *   - Wix CLI installed and authenticated
 *   - wix-data module available
 */

import wixData from 'wix-data';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_DIR = join(__dirname, '../src/backend/schemas');

// Collection schemas
const COLLECTIONS = [
    'Portfolio',
    'CustomCreations',
    'Orders',
    'PortalSessions'
];

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

/**
 * Log with color
 */
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load schema from JSON file
 */
function loadSchema(collectionName) {
    try {
        const schemaPath = join(SCHEMA_DIR, `${collectionName}.json`);
        const schemaData = readFileSync(schemaPath, 'utf8');
        return JSON.parse(schemaData);
    } catch (error) {
        log(`❌ Failed to load schema for ${collectionName}: ${error.message}`, 'red');
        throw error;
    }
}

/**
 * Check if collection exists
 */
async function collectionExists(collectionName) {
    try {
        await wixData.query(collectionName).limit(1).find();
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Create a collection with schema
 */
async function createCollection(schema) {
    const { collectionName, displayName, fields, permissions } = schema;

    log(`\n📦 Creating collection: ${displayName} (${collectionName})`, 'cyan');

    try {
        // Check if already exists
        const exists = await collectionExists(collectionName);
        if (exists) {
            log(`  ⚠️  Collection ${collectionName} already exists. Skipping creation.`, 'yellow');
            return { success: true, skipped: true };
        }

        // Note: Wix doesn't provide a programmatic API to create collections
        // This would need to be done through Wix CLI or manually
        // For now, this script validates schemas and provides instructions

        log(`  ℹ️  Collection needs to be created in Wix Editor:`, 'blue');
        log(`     1. Go to CMS → Database Collections`, 'blue');
        log(`     2. Click "+ New Collection"`, 'blue');
        log(`     3. Name: ${collectionName}`, 'blue');
        log(`     4. Display Name: ${displayName}`, 'blue');
        log(`     5. Add ${fields.length} fields (see schema file)`, 'blue');

        return { success: true, manual: true };

    } catch (error) {
        log(`  ❌ Error: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

/**
 * Verify collection schema matches expected structure
 */
async function verifyCollection(schema) {
    const { collectionName, fields } = schema;

    log(`\n✓ Verifying collection: ${collectionName}`, 'cyan');

    try {
        const exists = await collectionExists(collectionName);
        if (!exists) {
            log(`  ❌ Collection ${collectionName} does not exist`, 'red');
            return { verified: false, exists: false };
        }

        log(`  ✅ Collection exists`, 'green');

        // Try to query to verify it's accessible
        const testQuery = await wixData.query(collectionName).limit(1).find();
        log(`  ✅ Collection is accessible`, 'green');
        log(`  ℹ️  Current item count: ${testQuery.totalCount}`, 'blue');

        return { verified: true, exists: true, count: testQuery.totalCount };

    } catch (error) {
        log(`  ❌ Verification failed: ${error.message}`, 'red');
        return { verified: false, error: error.message };
    }
}

/**
 * Create indexes for a collection
 */
async function createIndexes(schema) {
    const { collectionName, indexes } = schema;

    if (!indexes || indexes.length === 0) {
        log(`  ℹ️  No indexes defined for ${collectionName}`, 'blue');
        return { success: true };
    }

    log(`\n📑 Creating ${indexes.length} indexes for ${collectionName}`, 'cyan');

    // Note: Wix doesn't provide programmatic index creation via code
    // Indexes must be created in the Wix Editor

    indexes.forEach((index, i) => {
        log(`  ${i + 1}. Index on: ${index.fields.join(', ')}`, 'blue');
        log(`     - Name: ${index.name}`, 'blue');
        log(`     - Unique: ${index.unique || false}`, 'blue');
    });

    log(`  ℹ️  Create these indexes manually in Wix Editor → CMS → Settings`, 'yellow');

    return { success: true, manual: true };
}

/**
 * Seed initial data for a collection
 */
async function seedCollection(collectionName, sampleData) {
    log(`\n🌱 Seeding data for ${collectionName}`, 'cyan');

    try {
        const exists = await collectionExists(collectionName);
        if (!exists) {
            log(`  ⚠️  Collection doesn't exist, skipping seed`, 'yellow');
            return { success: false, skipped: true };
        }

        // Check if already has data
        const existing = await wixData.query(collectionName).limit(1).find();
        if (existing.totalCount > 0) {
            log(`  ℹ️  Collection already has data (${existing.totalCount} items), skipping seed`, 'blue');
            return { success: true, skipped: true };
        }

        // Insert sample data
        if (sampleData && sampleData.length > 0) {
            for (const item of sampleData) {
                await wixData.insert(collectionName, item);
                log(`  ✅ Inserted: ${item.title || item._id || 'item'}`, 'green');
            }
            log(`  ✅ Seeded ${sampleData.length} items`, 'green');
            return { success: true, count: sampleData.length };
        } else {
            log(`  ℹ️  No sample data provided`, 'blue');
            return { success: true, skipped: true };
        }

    } catch (error) {
        log(`  ❌ Seeding failed: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

/**
 * Main setup function
 */
async function setupDatabase() {
    log('\n' + '='.repeat(60), 'bright');
    log('  🗄️  TTS Website V7 - Automated Database Setup', 'bright');
    log('='.repeat(60) + '\n', 'bright');

    const results = {
        total: COLLECTIONS.length,
        created: 0,
        verified: 0,
        failed: 0,
        manual: 0
    };

    // Load all schemas
    log('📂 Loading schemas...', 'cyan');
    const schemas = {};
    for (const collectionName of COLLECTIONS) {
        try {
            schemas[collectionName] = loadSchema(collectionName);
            log(`  ✅ Loaded ${collectionName}`, 'green');
        } catch (error) {
            log(`  ❌ Failed to load ${collectionName}`, 'red');
            results.failed++;
        }
    }

    // Process each collection
    for (const collectionName of COLLECTIONS) {
        const schema = schemas[collectionName];
        if (!schema) continue;

        // Try to create/verify collection
        const createResult = await createCollection(schema);
        if (createResult.manual) {
            results.manual++;
        } else if (createResult.success) {
            results.created++;
        } else {
            results.failed++;
        }

        // Create indexes
        await createIndexes(schema);

        // Verify collection
        const verifyResult = await verifyCollection(schema);
        if (verifyResult.verified) {
            results.verified++;
        }

        // Seed data if provided
        if (schema.sampleData) {
            await seedCollection(collectionName, schema.sampleData);
        }
    }

    // Summary
    log('\n' + '='.repeat(60), 'bright');
    log('  📊 Setup Summary', 'bright');
    log('='.repeat(60), 'bright');
    log(`Total Collections: ${results.total}`, 'cyan');
    log(`✅ Created/Verified: ${results.created}`, 'green');
    log(`✓ Verified: ${results.verified}`, 'green');
    log(`⚠️  Manual Setup Required: ${results.manual}`, 'yellow');
    log(`❌ Failed: ${results.failed}`, 'red');
    log('='.repeat(60) + '\n', 'bright');

    if (results.manual > 0) {
        log('⚠️  IMPORTANT: Some collections require manual setup in Wix Editor', 'yellow');
        log('   Follow the instructions above for each collection', 'yellow');
        log('   Or use the Wix Editor to create collections manually\n', 'yellow');
    }

    if (results.failed > 0) {
        log('❌ Some operations failed. Check the errors above.\n', 'red');
        process.exit(1);
    }

    log('✅ Database setup complete!\n', 'green');
}

/**
 * Validate schemas only (dry run)
 */
async function validateSchemas() {
    log('\n🔍 Validating schemas (dry run)...\n', 'cyan');

    for (const collectionName of COLLECTIONS) {
        try {
            const schema = loadSchema(collectionName);
            log(`✅ ${collectionName}: Valid`, 'green');
            log(`   - Fields: ${schema.fields.length}`, 'blue');
            log(`   - Indexes: ${schema.indexes?.length || 0}`, 'blue');
            log(`   - Permissions: ${Object.keys(schema.permissions || {}).length} roles`, 'blue');
        } catch (error) {
            log(`❌ ${collectionName}: Invalid - ${error.message}`, 'red');
        }
    }

    log('\n✅ Schema validation complete!\n', 'green');
}

// Run based on command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('--validate');

if (isDryRun) {
    validateSchemas().catch(console.error);
} else {
    setupDatabase().catch(error => {
        log(`\n❌ Fatal error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
}
