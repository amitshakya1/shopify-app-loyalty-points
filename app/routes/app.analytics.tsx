// ===
// Index page pattern
// ===

export default function AnalyticsPage() {
  return (
    <s-page heading="Analytics">
      <s-button slot="primary-action" variant="primary">
        Create puzzle
      </s-button>
      <s-button slot="secondary-actions" variant="secondary">
        Export puzzles
      </s-button>
      <s-button slot="secondary-actions" variant="secondary">
        Import puzzles
      </s-button>
      {/* === */}
      {/* Empty state */}
      {/* This should only be visible if the merchant has not created any puzzles yet. */}
      {/* === */}
      <s-section accessibilityLabel="Empty state section">
        <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
          <s-box maxInlineSize="200px" maxBlockSize="200px">
            <s-image
              aspectRatio="1/0.5"
              src="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
              alt="A stylized graphic of four characters, each holding a puzzle piece"
            />
          </s-box>
          <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
            <s-stack alignItems="center">
              <s-heading>Start creating puzzles</s-heading>
              <s-paragraph>
                Create and manage your collection of puzzles for players to
                enjoy.
              </s-paragraph>
            </s-stack>
            <s-button-group>
              <s-button
                slot="secondary-actions"
                aria-label="Learn more about creating puzzles"
              >
                {" "}
                Learn more{" "}
              </s-button>
              <s-button slot="primary-action" aria-label="Add a new puzzle">
                {" "}
                Create puzzle{" "}
              </s-button>
            </s-button-group>
          </s-grid>
        </s-grid>
      </s-section>


    </s-page>
  );
}

