# frozen_string_literal: true

module HasTheme
  extend ActiveSupport::Concern

  def self.included(base)
    base.class_eval do
      extend ClassMethods
    end
  end

  module ClassMethods
    extend ActionController::Helpers::ClassMethods

    def theme(theme_name)
      define_theme_helper(theme_name)
    end

    def define_theme_helper(theme_name)
      helper_method :theme_stylesheet_link_tag
      helper_method :current_theme

      define_method(:theme_stylesheet_link_tag) do
        theme_path = theme_name.to_s == 'default' ? 'application.css' : "themes/#{theme_name}.css"

        helpers.stylesheet_link_tag(
          theme_path,
          media: 'all',
          'data-turbolinks-track': 'reload',
          defer: true
        )
      end

      define_method(:current_theme) do
        theme_name
      end
    end
  end
end
