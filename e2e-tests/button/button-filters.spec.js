/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { insertButtonBlock, selectButtonBlock } from './button-helper';
import {
	ensureSidebarOpened,
	getInputValueByLabel,
	getRichTextValueByLabel,
	getSelectedValueBySelectLabel,
	getTextControlValueByLabel,
	getToggleValueByLabel,
	selectOption,
	selectOptionIsAvailable,
	toolbarOptionIsActive,
} from '../helper';

describe( 'button block filters', () => {
	beforeAll( async () => {
		await activatePlugin( 'wp-bootstrap-blocks-test-button-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'wp-bootstrap-blocks-test-button-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'wpBootstrapBlocks.button.styleOptions should add style option', async () => {
		await insertButtonBlock();
		await selectButtonBlock();
		await ensureSidebarOpened();

		// Additional style option should be available
		expect( await selectOptionIsAvailable( 'Style', 'brand' ) ).toBe(
			true
		);

		// Style option should be applied
		await selectOption( 'Style', 'brand' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'wp_bootstrap_blocks_button_default_attributes should override default attributes', async () => {
		await insertButtonBlock();
		await selectButtonBlock();
		await ensureSidebarOpened();

		// Alignment should be selected
		expect(
			await toolbarOptionIsActive(
				'Change button alignment',
				'Align text center'
			)
		).toBe( true );

		// Style should be selected
		expect( await getSelectedValueBySelectLabel( 'Style' ) ).toMatch(
			'secondary'
		);

		// Text should be set
		expect( await getRichTextValueByLabel( 'Add text...' ) ).toMatch(
			'Liip'
		);

		// URL should be set
		expect( await getInputValueByLabel( 'URL' ) ).toMatch(
			'https://liip.ch'
		);

		// Open in new tab is enabled
		expect( await getToggleValueByLabel( 'Open in new tab' ) ).toBe( true );

		// Rel should be set
		expect( await getTextControlValueByLabel( 'Link rel' ) ).toBe(
			'custom rel'
		);

		// Check if attributes are set correctly
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
