require_relative 'boot'

require 'rails/all'
require "view_component/engine"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Juneproperties
  class Application < Rails::Application
    config.generators do |generate|
      generate.assets false
      generate.helper false
      generate.test_framework :rspec, fixture: false
      generate.factory_bot dir: '/spec/factories/'
    end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.assets.paths << Rails.root.join('app/assets/fonts')
    config.eager_load_paths << Rails.root.join('lib')
    # config.autoload_paths += Dir[Rails.root.join('app/models/*/')]
  end
end
