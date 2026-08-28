export type Lane = "top" | "middle";

export type SourceLink = {
  id: number;
  title: string;
  url: string;
  source_type: string;
  published_at: string | null;
  excerpt: string | null;
  stance: string;
  is_synthetic: boolean;
};

export type Advice = {
  id: number;
  claim: string;
  category: string;
  game_stage: string;
  conditions: string | null;
  consensus_score: number;
  consensus_label: string;
  supporting_sources: number;
  opposing_sources: number;
  patch_relevance: string;
  opposing_view: string | null;
  score_components: Record<string, unknown>;
  sources: SourceLink[];
};

export type RunePage = {
  id: number;
  name: string;
  patch_range: string;
  sample_size: number;
  wins: number;
  losses: number;
  raw_win_rate: number;
  pick_rate: number;
  adjusted_score: number;
  rank_range: string;
  region: string;
  configuration: {
    keystone: string;
    primary: string[];
    secondary: string[];
    shards: string[];
  };
  is_low_sample: boolean;
  data_status: string;
  stat_scope?: "keystone" | "configuration";
  pick_rate_kind?: "source_pick_rate" | "derived_matchup_share";
};

export type MatchupStatsSnapshot = {
  source_name: string;
  source_url: string;
  captured_at: string;
  patch: string;
  window?: string;
  tier: string;
  region: string;
  queue: string;
  player_lane: string;
  opponent_lane: string;
  win_rate: number;
  games: number;
  raw_delta: number;
  normalized_delta: number;
};

export type SummonerSpellSet = {
  choices: { id: number; name: string }[];
  sample_size: number;
  raw_win_rate: number;
  pick_rate: number;
  is_low_sample: boolean;
};

export type Item = {
  id: number;
  item_id: number;
  name: string;
  stage: string;
  order: number | null;
  sample_size: number;
  raw_win_rate: number;
  adjusted_score: number;
  pick_rate: number;
  median_purchase_minute: number | null;
  is_low_sample: boolean;
  data_status: string;
  pick_rate_kind?: "source_pick_rate" | "derived_matchup_share";
};

export type BonusItem = { id: number; name: string };

export type Matchup = {
  id: number;
  player: Champion;
  opponent: Champion;
  role: string;
  patch_range: string;
  community_processed_at: string;
  source_thread_count: number;
  passage_count: number;
  data_status: string;
  disclaimer: string;
  stats_snapshot: MatchupStatsSnapshot | null;
  advice: Advice[];
  ability_interactions: {
    player_ability: string;
    opponent_ability: string;
    interaction_type: string;
    advice: string;
    timing: string | null;
    conditions: string | null;
  }[];
  rune_pages: RunePage[];
  summoner_spells?: SummonerSpellSet | null;
  bonus_items?: BonusItem[];
  items: Item[];
  videos: {
    id: number;
    category: string;
    title: string;
    channel: string;
    url: string;
    embed_url?: string;
    playlist_url?: string;
    playlist_label?: string;
    published_at: string | null;
    patch_reference: string | null;
    player_rank: string | null;
    result: string | null;
    relevance_score: number;
    rationale: string;
    is_verified: boolean;
  }[];
};

export type Champion = {
  slug: string;
  name: string;
  image_url: string;
  roles: string[];
};
